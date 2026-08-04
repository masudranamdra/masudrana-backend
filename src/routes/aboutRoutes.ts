import express from 'express';
import multer from 'multer';
import {
  getFullAbout,
  getBasic, updateBasic,
  getSettings, updateSettings,
  getLifestyle, updateLifestyle,
  getTimelines, createTimeline, updateTimeline, deleteTimeline,
  getFAQs, createFAQ, updateFAQ, deleteFAQ,
  getGallery, createGallery, updateGallery, deleteGallery,
  uploadImage, deleteImage
} from '../controllers/aboutController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

// Multer memory storage for Cloudinary upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public full fetch
router.get('/', getFullAbout);

// Admin Basic Info
router.get('/basic', getBasic);
router.put('/basic', protect, restrictTo('admin'), updateBasic);

// Admin Settings
router.get('/settings', getSettings);
router.put('/settings', protect, restrictTo('admin'), updateSettings);

// Admin Lifestyle
router.get('/lifestyle', getLifestyle);
router.put('/lifestyle', protect, restrictTo('admin'), updateLifestyle);

// Timelines
router.get('/timeline', getTimelines);
router.post('/timeline', protect, restrictTo('admin'), createTimeline);
router.put('/timeline/:id', protect, restrictTo('admin'), updateTimeline);
router.delete('/timeline/:id', protect, restrictTo('admin'), deleteTimeline);

// FAQs
router.get('/faq', getFAQs);
router.post('/faq', protect, restrictTo('admin'), createFAQ);
router.put('/faq/:id', protect, restrictTo('admin'), updateFAQ);
router.delete('/faq/:id', protect, restrictTo('admin'), deleteFAQ);

// Gallery
router.get('/gallery', getGallery);
router.post('/gallery', protect, restrictTo('admin'), createGallery);
router.put('/gallery/:id', protect, restrictTo('admin'), updateGallery);
router.delete('/gallery/:id', protect, restrictTo('admin'), deleteGallery);

// Image Upload/Delete
router.post('/upload', protect, restrictTo('admin'), upload.single('image'), uploadImage);
router.post('/delete-image', protect, restrictTo('admin'), deleteImage);

export default router;
