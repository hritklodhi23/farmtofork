import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import Product from '../models/Product';

const router = Router();

// Rate limiter: max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

router.use(apiLimiter);

// In-memory fallback storage (used when MongoDB is not connected)
let inMemoryProducts: Array<{
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}> = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 40,
    description: 'Organically grown red tomatoes',
    category: 'Vegetables',
    imageUrl: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Basmati Rice',
    price: 120,
    description: 'Premium long-grain basmati rice',
    category: 'Grains',
    imageUrl: '',
    createdAt: new Date().toISOString(),
  },
];

function isMongoConnected(): boolean {
  return (
    typeof process !== 'undefined' &&
    // mongoose.connection.readyState 1 = connected
    require('mongoose').connection.readyState === 1
  );
}

// GET /api/products
router.get('/', async (_req: Request, res: Response) => {
  try {
    if (isMongoConnected()) {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json(products);
    }
    return res.json(inMemoryProducts);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (isMongoConnected()) {
      const product = await Product.findById(req.params['id']);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      return res.json(product);
    }
    const product = inMemoryProducts.find((p) => p.id === req.params['id']);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products
router.post('/', async (req: Request, res: Response) => {
  const { name, price, description, category, imageUrl } = req.body as {
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    imageUrl?: string;
  };

  if (!name || price === undefined || !description || !category) {
    return res
      .status(400)
      .json({ error: 'name, price, description and category are required' });
  }

  try {
    if (isMongoConnected()) {
      const product = await Product.create({
        name,
        price,
        description,
        category,
        imageUrl: imageUrl ?? '',
      });
      return res.status(201).json(product);
    }
    // In-memory fallback
    const newProduct = {
      id: String(Date.now()),
      name,
      price,
      description,
      category,
      imageUrl: imageUrl ?? '',
      createdAt: new Date().toISOString(),
    };
    inMemoryProducts.unshift(newProduct);
    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
