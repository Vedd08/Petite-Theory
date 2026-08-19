import express, { Request, Response } from 'express';
import Product from '../models/Product';
import upload from '../middleware/upload';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

router.get('/seed-samples', async (req: Request, res: Response) => {
  const sampleProducts = [
    {
      title: 'Classic Chocolate Truffle Cake',
      description: 'Rich and decadent chocolate cake layered with dark chocolate ganache. A chocolate lover\'s absolute dream.',
      price: 1200,
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop',
      category: 'Chocolate',
      isAvailable: true,
    },
    {
      title: 'Red Velvet Cream Cheese Cake',
      description: 'Moist red velvet sponge with a smooth and creamy cheese frosting, topped with elegant crumb dust.',
      price: 1500,
      imageUrl: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=1114&auto=format&fit=crop',
      category: 'Premium',
      isAvailable: true,
    },
    {
      title: 'Fresh Fruit Gateau',
      description: 'Light vanilla sponge loaded with seasonal fresh fruits and fluffy whipped cream.',
      price: 1100,
      imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1236&auto=format&fit=crop',
      category: 'Fruit',
      isAvailable: true,
    },
    {
      title: 'Biscoff Lotus Cheesecake',
      description: 'Creamy baked cheesecake with a crunchy Biscoff biscuit base and topped with generous Biscoff spread.',
      price: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1170&auto=format&fit=crop',
      category: 'Cheesecakes',
      isAvailable: true,
    },
    {
      title: 'Black Forest Classic',
      description: 'Traditional German chocolate cake with rich cherry filling, whipped cream, and chocolate shavings.',
      price: 1000,
      imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1203&auto=format&fit=crop',
      category: 'Classic',
      isAvailable: true,
    },
  ];

  try {
    for (const p of sampleProducts) {
      await Product.create(p);
    }
    res.send('Seeded 5 products!');
  } catch (error) {
    res.status(500).send('Error seeding products');
  }
});

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
