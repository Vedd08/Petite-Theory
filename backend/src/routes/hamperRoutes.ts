import express, { Request, Response } from 'express';
import Hamper from '../models/Hamper';
import upload from '../middleware/upload';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

const parsePrice = (raw: unknown): number | undefined => {
  if (raw === undefined || raw === null || raw === '') return undefined;
  const num = Number(raw);
  return Number.isNaN(num) ? undefined : num;
};

const parseContents = (raw: unknown): string[] => {
  if (Array.isArray(raw)) return raw.filter((item): item is string => typeof item === 'string');
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
    } catch {
      return [];
    }
  }
  return [];
};

// GET all hampers
router.get('/', async (req: Request, res: Response) => {
  try {
    const hampers = await Hamper.find({}).sort({ createdAt: -1 });
    res.json(hampers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET a hamper by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const hamper = await Hamper.findById(req.params.id);
    if (hamper) {
      res.json(hamper);
    } else {
      res.status(404).json({ message: 'Hamper not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new hamper
router.post('/', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, price, occasion, isAvailable } = req.body;
    let imageUrl = req.body.imageUrl; // Fallback if they pass a URL string instead

    if (req.file) {
      imageUrl = req.file.path;
    }

    const hamper = new Hamper({
      title,
      description,
      price: parsePrice(price),
      imageUrl,
      occasion,
      contents: parseContents(req.body.contents),
      isAvailable,
    });

    const createdHamper = await hamper.save();
    res.status(201).json(createdHamper);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update hamper
router.put('/:id', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, price, occasion, isAvailable } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = req.file.path;
    }

    const hamper = await Hamper.findById(req.params.id);

    if (hamper) {
      hamper.title = title || hamper.title;
      hamper.description = description || hamper.description;
      if (price !== undefined) hamper.price = parsePrice(price);
      if (imageUrl) hamper.imageUrl = imageUrl;
      hamper.occasion = occasion || hamper.occasion;
      if (req.body.contents !== undefined) {
        hamper.contents = parseContents(req.body.contents);
      }
      if (isAvailable !== undefined) {
        hamper.isAvailable = isAvailable;
      }

      const updatedHamper = await hamper.save();
      res.json(updatedHamper);
    } else {
      res.status(404).json({ message: 'Hamper not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE hamper
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const hamper = await Hamper.findById(req.params.id);
    if (hamper) {
      await hamper.deleteOne();
      res.json({ message: 'Hamper removed' });
    } else {
      res.status(404).json({ message: 'Hamper not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
