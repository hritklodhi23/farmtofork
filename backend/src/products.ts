import { Router, Request, Response } from "express";

export const productsRouter = Router();

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt: string;
}

// Temporary in-memory storage (replace with MongoDB later)
let products: Product[] = [];

productsRouter.get("/", (_req: Request, res: Response) => {
  res.json(products);
});

productsRouter.post("/", (req: Request, res: Response) => {
  const { name, category, price } = req.body as Partial<Product>;

  if (!name || !category || price == null) {
    res.status(400).json({ error: "name, category, and price are required" });
    return;
  }

  const newProduct: Product = {
    id: crypto.randomUUID(),
    name,
    category,
    price: Number(price),
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});
