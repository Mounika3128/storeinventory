const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventory_db"

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✓ MongoDB connected successfully"))
  .catch((err) => console.error("✗ MongoDB connection error:", err))

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Product = mongoose.model("Product", productSchema)

// API Routes

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// CREATE product
app.post("/api/products", async (req, res) => {
  try {
    const { name, sku, quantity, price, category } = req.body

    if (!name || !sku || quantity === undefined || !price || !category) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const product = new Product({
      name,
      sku,
      quantity,
      price,
      category,
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "SKU already exists" })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// UPDATE product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, sku, quantity, price, category } = req.body

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, sku, quantity, price, category },
      { new: true, runValidators: true },
    )

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "SKU already exists" })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// DELETE product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`)
  console.log(`📦 API available at http://localhost:${PORT}/api/products\n`)
})
