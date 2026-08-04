import fs from 'fs';
import path from 'path';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary';
import { uploadToCloudinary } from '../utils/cloudinary';

export interface UploadResult {
  url: string;
  publicId?: string;
}

export const uploadFile = async (
  file: Express.Multer.File,
  folder: string = 'portfolio'
): Promise<UploadResult> => {
  if (isCloudinaryConfigured) {
    try {
      if (file.buffer) {
        // Stream directly from memory buffer (production & serverless native)
        const res = await uploadToCloudinary(file.buffer, folder);
        return {
          url: res.url,
          publicId: res.publicId,
        };
      } else if (file.path && fs.existsSync(file.path)) {
        // Disk storage fallback if file.path is present
        const result = await cloudinary.uploader.upload(file.path, {
          folder: folder,
          resource_type: 'auto',
        });
        try {
          fs.unlinkSync(file.path);
        } catch {}
        return {
          url: result.secure_url,
          publicId: result.public_id,
        };
      }
    } catch (error: any) {
      console.error('Cloudinary upload error:', error.message);
      if (process.env.VERCEL) {
        throw new Error(`Media upload failed: ${error.message}`);
      }
    }
  }

  if (process.env.VERCEL) {
    throw new Error('Cloudinary environment variables must be configured on Vercel for media uploads.');
  }

  // Local static storage fallback (development mode only)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const extension = path.extname(file.originalname);
  const baseName = path.basename(file.originalname, extension).replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${baseName}_${Date.now()}${extension}`;
  const targetPath = path.join(uploadDir, fileName);

  if (file.buffer) {
    fs.writeFileSync(targetPath, file.buffer);
  } else if (file.path && fs.existsSync(file.path)) {
    fs.renameSync(file.path, targetPath);
  } else {
    throw new Error('No file contents found for storage');
  }

  return {
    url: `/uploads/${fileName}`,
    publicId: fileName,
  };
};

export const deleteFile = async (publicId: string): Promise<boolean> => {
  if (!publicId) return false;
  
  if (isCloudinaryConfigured && !publicId.includes('.')) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error: any) {
      console.error('Cloudinary delete error:', error.message);
      return false;
    }
  }

  if (!process.env.VERCEL) {
    try {
      const filePath = path.join(process.cwd(), 'public', 'uploads', publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
    } catch (error: any) {
      console.error('Local file delete error:', error.message);
    }
  }
  return false;
};
