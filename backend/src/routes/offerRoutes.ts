import express, { Request, Response } from 'express';
import Offer from '../models/Offer';
import upload from '../middleware/upload';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

// GET all offers (admin)
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    res.json(offers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET offers currently live (public) - active flag + within the date window
router.get('/active', async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const offers = await Offer.find({
      isActive: true,
      $and: [
        { $or: [{ startDate: { $exists: false } }, { startDate: null }, { startDate: { $lte: now } }] },
        { $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: now } }] },
      ],
    }).sort({ createdAt: -1 });
    res.json(offers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET an offer by ID (admin)
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (offer) {
      res.json(offer);
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new offer
router.post('/', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, discountLabel, code, ctaLabel, ctaLink, startDate, endDate, isActive } = req.body;
    let imageUrl = req.body.imageUrl; // Fallback if they pass a URL string instead

    if (req.file) {
      imageUrl = req.file.path;
    }

    const offer = new Offer({
      title,
      description,
      discountLabel,
      code,
      imageUrl,
      ctaLabel,
      ctaLink,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      isActive,
    });

    const createdOffer = await offer.save();
    res.status(201).json(createdOffer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update offer
router.put('/:id', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, discountLabel, code, ctaLabel, ctaLink, startDate, endDate, isActive } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = req.file.path;
    }

    const offer = await Offer.findById(req.params.id);

    if (offer) {
      offer.title = title || offer.title;
      offer.description = description;
      offer.discountLabel = discountLabel;
      offer.code = code;
      if (imageUrl) offer.imageUrl = imageUrl;
      offer.ctaLabel = ctaLabel;
      offer.ctaLink = ctaLink;
      offer.startDate = startDate || undefined;
      offer.endDate = endDate || undefined;
      if (isActive !== undefined) {
        offer.isActive = isActive;
      }

      const updatedOffer = await offer.save();
      res.json(updatedOffer);
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE offer
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (offer) {
      await offer.deleteOne();
      res.json({ message: 'Offer removed' });
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
