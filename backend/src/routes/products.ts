import { Router, Request, Response } from "express";

export const productsRouter = Router();

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt: string;
};

// In-memory store (replace with MongoDB later)
let products: Product[] = [];

// GET /api/products
productsRouter.get("/", (_req: Request, res: Response) => {
  res.json(products);
});

// POST /api/products
productsRouter.post("/", (req: Request, res: Response) => {
  const { name, category, price } = req.body as Partial<Product>;

  if (!name || !category || price == null) {
    res.status(400).json({ error: "name, category, and price are required" });
    return;
  }

  const newProduct: Product = {
    id: Date.now().toString(),
    name,
    category,
    price: Number(price),
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});
