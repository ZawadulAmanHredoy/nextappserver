const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

// Add your Netlify URL here after deploy
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

let items = [
  {
    id: "1",
    name: "Wireless Mouse",
    description: "Ergonomic mouse for daily use.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200",
    category: "Accessories",
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    description: "Clicky switches, fast typing.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200",
    category: "Accessories",
  },
];

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/items", (req, res) => res.json(items));

app.get("/api/items/:id", (req, res) => {
  const item = items.find((x) => x.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const { name, description, price, image, category } = req.body;

  if (!name || !description || price === undefined) {
    return res.status(400).json({ message: "Missing fields: name, description, price" });
  }

  const newItem = {
    id: String(Date.now()),
    name,
    description,
    price: Number(price),
    image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
    category: category || "General",
  };

  items.unshift(newItem);
  res.status(201).json(newItem);
});

// IMPORTANT: export app for Vercel
module.exports = app;
