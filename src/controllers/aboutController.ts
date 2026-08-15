import { Request, Response } from 'express';
import AboutBasic from '../models/AboutBasic';
import AboutSettings from '../models/AboutSettings';
import AboutTimeline from '../models/AboutTimeline';
import AboutLifestyle from '../models/AboutLifestyle';
import AboutProfessional from '../models/AboutProfessional';
import AboutFAQ from '../models/AboutFAQ';
import AboutGallery from '../models/AboutGallery';
import Project from '../models/Project';
import Testimonial from '../models/Testimonial';
import Skill from '../models/Skill';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

// --- FULL ABOUT FETCH (For Public Pages) ---
export const getFullAbout = async (req: Request, res: Response) => {
  try {
    const basic = await AboutBasic.findOne();
    const settings = await AboutSettings.findOne();
    const professional = await AboutProfessional.findOne();
    const timelines = await AboutTimeline.find({ visible: true }).sort({ order: 1 });
    const lifestyle = await AboutLifestyle.findOne();
    const faqs = await AboutFAQ.find({ visible: true }).sort({ order: 1 });
    const galleryRaw = await AboutGallery.find({ visible: true }).sort({ order: 1 });
    const gallery = galleryRaw.map((item: any) => {
      const itemUrl = item.url || item.image?.url || '';
      const itemPublicId = item.publicId || item.image?.publicId || '';
      const itemCaption = item.caption || item.title || '';
      const isFeatured = item.isFeatured ?? item.featured ?? false;

      return {
        _id: item._id,
        url: itemUrl,
        publicId: itemPublicId,
        image: { url: itemUrl, publicId: itemPublicId },
        caption: itemCaption,
        title: itemCaption,
        category: item.category || 'Life',
        type: item.type || 'image',
        isFeatured,
        featured: isFeatured,
        isProtected: item.isProtected || false,
        order: item.order || 0,
        visible: item.visible ?? true,
      };
    });
    
    // Derived collections
    const projects = await Project.find({ featuredInAbout: true }).sort({ order: 1 });
    const testimonials = await Testimonial.find({ showOnAbout: true }).sort({ order: 1 });
    const skills = await Skill.find({ showOnAbout: true }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: {
        basic: basic || {},
        settings: settings || {},
        professional: professional || {},
        timelines,
        lifestyle: lifestyle || {},
        faqs,
        gallery,
        projects,
        testimonials,
        skills
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// --- BASIC INFO ---
export const getBasic = async (req: Request, res: Response) => {
  try {
    let basic = await AboutBasic.findOne();
    if (!basic) basic = await AboutBasic.create({});
    res.status(200).json({ success: true, data: basic });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateBasic = async (req: Request, res: Response) => {
  try {
    let basic = await AboutBasic.findOne();
    if (basic) {
      basic = await AboutBasic.findByIdAndUpdate(basic._id, req.body, { new: true, runValidators: true });
    } else {
      basic = await AboutBasic.create(req.body);
    }
    res.status(200).json({ success: true, data: basic, message: 'Basic info updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating basic info', error: error.message });
  }
};

// --- SETTINGS ---
export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await AboutSettings.findOne();
    if (!settings) settings = await AboutSettings.create({});
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await AboutSettings.findOne();
    if (settings) {
      settings = await AboutSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    } else {
      settings = await AboutSettings.create(req.body);
    }
    res.status(200).json({ success: true, data: settings, message: 'Settings updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating settings', error: error.message });
  }
};

// --- LIFESTYLE ---
export const getLifestyle = async (req: Request, res: Response) => {
  try {
    let lifestyle = await AboutLifestyle.findOne();
    if (!lifestyle) lifestyle = await AboutLifestyle.create({});
    res.status(200).json({ success: true, data: lifestyle });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateLifestyle = async (req: Request, res: Response) => {
  try {
    let lifestyle = await AboutLifestyle.findOne();
    if (lifestyle) {
      lifestyle = await AboutLifestyle.findByIdAndUpdate(lifestyle._id, req.body, { new: true, runValidators: true });
    } else {
      lifestyle = await AboutLifestyle.create(req.body);
    }
    res.status(200).json({ success: true, data: lifestyle, message: 'Lifestyle updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating lifestyle', error: error.message });
  }
};

// --- PROFESSIONAL ---
export const getProfessional = async (req: Request, res: Response) => {
  try {
    let professional = await AboutProfessional.findOne();
    if (!professional) professional = await AboutProfessional.create({});
    res.status(200).json({ success: true, data: professional });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateProfessional = async (req: Request, res: Response) => {
  try {
    let professional = await AboutProfessional.findOne();
    if (professional) {
      professional = await AboutProfessional.findByIdAndUpdate(professional._id, req.body, { new: true, runValidators: true });
    } else {
      professional = await AboutProfessional.create(req.body);
    }
    res.status(200).json({ success: true, data: professional, message: 'Professional info updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating professional info', error: error.message });
  }
};

// --- TIMELINES ---
export const getTimelines = async (req: Request, res: Response) => {
  try {
    const timelines = await AboutTimeline.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: timelines });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateBulkTimeline = async (req: Request, res: Response) => {
  try {
    const timelineList = req.body.timeline || req.body;
    if (Array.isArray(timelineList)) {
      await AboutTimeline.deleteMany({});
      const created = await AboutTimeline.insertMany(timelineList);
      return res.status(200).json({ success: true, data: { timeline: created }, message: 'Timeline saved successfully' });
    }
    res.status(400).json({ success: false, message: 'Invalid payload format' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating timeline', error: error.message });
  }
};

export const createTimeline = async (req: Request, res: Response) => {
  try {
    const timeline = await AboutTimeline.create(req.body);
    res.status(201).json({ success: true, data: timeline });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateTimeline = async (req: Request, res: Response) => {
  try {
    const timeline = await AboutTimeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!timeline) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: timeline });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const deleteTimeline = async (req: Request, res: Response) => {
  try {
    await AboutTimeline.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Timeline deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// --- GALLERY & FAQS (Similar pattern) ---
// I will just add generic endpoints for FAQ and Gallery arrays
export const getFAQs = async (req: Request, res: Response) => {
  try {
    const faqs = await AboutFAQ.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
export const createFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await AboutFAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
export const updateFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await AboutFAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
export const deleteFAQ = async (req: Request, res: Response) => {
  try {
    await AboutFAQ.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getGallery = async (req: Request, res: Response) => {
  try {
    const galleryRaw = await AboutGallery.find().sort({ order: 1 });
    const formattedGallery = galleryRaw.map((item: any) => {
      const itemUrl = item.url || item.image?.url || '';
      const itemPublicId = item.publicId || item.image?.publicId || '';
      const itemCaption = item.caption || item.title || '';
      const isFeatured = item.isFeatured ?? item.featured ?? false;

      return {
        _id: item._id,
        url: itemUrl,
        publicId: itemPublicId,
        image: { url: itemUrl, publicId: itemPublicId },
        caption: itemCaption,
        title: itemCaption,
        category: item.category || 'Life',
        type: item.type || 'image',
        isFeatured,
        featured: isFeatured,
        isProtected: item.isProtected || false,
        order: item.order || 0,
        visible: item.visible ?? true,
      };
    });
    res.status(200).json({ success: true, data: { gallery: formattedGallery } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateBulkGallery = async (req: Request, res: Response) => {
  try {
    const { gallery } = req.body;
    if (!Array.isArray(gallery)) {
      return res.status(400).json({ success: false, message: 'gallery array required' });
    }

    // Replace gallery items
    await AboutGallery.deleteMany({});

    const formattedItems = gallery.map((item: any, index: number) => {
      const itemUrl = item.url || item.image?.url || '';
      const itemPublicId = item.publicId || item.image?.publicId || '';
      const itemCaption = item.caption || item.title || '';
      const isFeatured = item.isFeatured ?? item.featured ?? false;

      return {
        url: itemUrl,
        publicId: itemPublicId,
        image: {
          url: itemUrl,
          publicId: itemPublicId,
        },
        caption: itemCaption,
        title: itemCaption,
        type: item.type || 'image',
        isFeatured,
        featured: isFeatured,
        isProtected: item.isProtected || false,
        category: item.category || 'Life',
        order: index,
        visible: item.visible ?? true,
      };
    });

    const savedGallery = await AboutGallery.insertMany(formattedItems);

    const returnedGallery = savedGallery.map((item: any) => {
      const itemUrl = item.url || item.image?.url || '';
      const itemPublicId = item.publicId || item.image?.publicId || '';
      const itemCaption = item.caption || item.title || '';
      const isFeatured = item.isFeatured ?? item.featured ?? false;

      return {
        _id: item._id,
        url: itemUrl,
        publicId: itemPublicId,
        image: { url: itemUrl, publicId: itemPublicId },
        caption: itemCaption,
        title: itemCaption,
        category: item.category || 'Life',
        type: item.type || 'image',
        isFeatured,
        featured: isFeatured,
        isProtected: item.isProtected || false,
        order: item.order || 0,
        visible: item.visible ?? true,
      };
    });

    res.status(200).json({ success: true, data: { gallery: returnedGallery } });
  } catch (error: any) {
    console.error('updateBulkGallery error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to save gallery' });
  }
};

export const createGallery = async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const itemUrl = item.url || item.image?.url || '';
    const itemPublicId = item.publicId || item.image?.publicId || '';
    const itemCaption = item.caption || item.title || '';
    const isFeatured = item.isFeatured ?? item.featured ?? false;

    const formatted = {
      ...item,
      url: itemUrl,
      publicId: itemPublicId,
      image: { url: itemUrl, publicId: itemPublicId },
      caption: itemCaption,
      title: itemCaption,
      isFeatured,
      featured: isFeatured,
    };
    const gallery = await AboutGallery.create(formatted);
    res.status(201).json({ success: true, data: gallery });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateGallery = async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const itemUrl = item.url || item.image?.url;
    const itemPublicId = item.publicId || item.image?.publicId;
    const itemCaption = item.caption || item.title;
    const isFeatured = item.isFeatured ?? item.featured;

    const updateData: any = { ...item };
    if (itemUrl !== undefined) {
      updateData.url = itemUrl;
      updateData.image = { url: itemUrl, publicId: itemPublicId || '' };
    }
    if (itemCaption !== undefined) {
      updateData.caption = itemCaption;
      updateData.title = itemCaption;
    }
    if (isFeatured !== undefined) {
      updateData.isFeatured = isFeatured;
      updateData.featured = isFeatured;
    }

    const gallery = await AboutGallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: gallery });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
export const deleteGallery = async (req: Request, res: Response) => {
  try {
    await AboutGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

import { uploadFile, deleteFile as deleteFileService } from '../services/cloudinaryService';

// --- UPLOAD HANDLER ---
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }
    const result = await uploadFile(req.file, 'portfolio_about');
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ success: false, message: 'publicId required' });
    await deleteFileService(publicId);
    res.status(200).json({ success: true, message: 'Image deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Delete failed', error: error.message });
  }
};
