import { Router } from "express";
import { randomUUID } from "crypto";

export const productsRouter = Router();

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt: string;
}

let products: Product[] = [];

productsRouter.get("/", (_req, res) => {
  res.json(products);
});

productsRouter.post("/", (req, res) => {
  const body = req.body as { name?: unknown; category?: unknown; price?: unknown };

  if (!body?.name || !body?.category || body?.price == null) {
    res.status(400).json({ error: "name, category, price are required" });
    return;
  }

  const price = Number(body.price);
  if (!Number.isFinite(price) || price < 0) {
    res.status(400).json({ error: "price must be a non-negative number" });
    return;
  }

  const newProduct: Product = {
    id: randomUUID(),
    name: String(body.name),
    category: String(body.category),
    price,
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});
