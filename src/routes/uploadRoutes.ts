import express, { Request, Response } from 'express';
import multer from 'multer';
import { uploadFile, deleteFile } from '../services/cloudinaryService';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// @route   POST /api/upload
// @desc    Upload image or document file (Cloudinary with local fallback)
// @access  Private/Admin
router.post(
  '/', 
  protect, 
  restrictTo('admin'), 
  upload.single('image'), 
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const folder = (req.body.folder as string) || 'portfolio';
      const result = await uploadFile(req.file, folder);

      return res.status(200).json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId || ''
        }
      });
    } catch (error: any) {
      console.error('Upload Error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error uploading file'
      });
    }
  }
);

// @route   POST /api/upload/delete
// @desc    Delete uploaded file
// @access  Private/Admin
router.post(
  '/delete', 
  protect, 
  restrictTo('admin'), 
  async (req: Request, res: Response) => {
    try {
      const { publicId } = req.body;
      if (!publicId) {
        return res.status(400).json({ success: false, message: 'publicId is required' });
      }

      const success = await deleteFile(publicId);
      return res.status(200).json({ success, message: success ? 'Deleted' : 'Delete failed' });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message || 'Delete error' });
    }
  }
);

export default router;
