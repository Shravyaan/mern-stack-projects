const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const product = await Product.find();
  res.json(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.json({ message: "Product not found" });
  }
  res.json(product);
});

router.post("/", async (req, res) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.json(savedProduct);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch {
    if (updated) return res.json({ message: "Product updated" });
    res.json(updated);
  }
});

router.delete("/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  else return res.json({ message: "Product deleted" });
  res.json(deleted);
});

module.exports = router;
