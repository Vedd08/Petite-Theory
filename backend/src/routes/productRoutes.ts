import express, { Request, Response } from 'express';
import Product from '../models/Product';
import upload from '../middleware/upload';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

// GET all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET a product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new product
router.post('/', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, price, category, isAvailable } = req.body;
    let imageUrl = req.body.imageUrl; // Fallback if they pass a URL string instead

    if (req.file) {
      imageUrl = req.file.path;
    }

    const product = new Product({
      title,
      description,
      price,
      imageUrl,
      category,
      isAvailable
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update product
router.put('/:id', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, price, category, isAvailable } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = req.file.path;
    }
    
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      if (imageUrl) product.imageUrl = imageUrl;
      product.category = category || product.category;
      if (isAvailable !== undefined) {
        product.isAvailable = isAvailable;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE product
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
