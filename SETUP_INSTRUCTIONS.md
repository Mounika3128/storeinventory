# Store Inventory System - Setup Guide

## Project Structure
\`\`\`
project/
├── server.js           (Node.js backend)
├── package.json        (Dependencies)
├── .env.example        (Environment variables template)
├── public/
│   ├── index.html      (Frontend HTML)
│   ├── style.css       (Styling)
│   └── script.js       (Frontend JavaScript)
└── SETUP_INSTRUCTIONS.md
\`\`\`

## Prerequisites
- Node.js (v14 or higher) - Download from https://nodejs.org/
- MongoDB (local or cloud) - https://www.mongodb.com/

## Installation & Setup

### Step 1: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 2: Configure MongoDB
Option A - Local MongoDB:
- Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
- Start MongoDB service (varies by OS)

Option B - MongoDB Atlas (Cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string
- Copy connection string to .env file

### Step 3: Setup Environment Variables
\`\`\`bash
# Copy the example file
cp .env.example .env

# Edit .env and add your MongoDB connection string
# For local: mongodb://localhost:27017/inventory_db
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/inventory_db
\`\`\`

### Step 4: Start the Server
\`\`\`bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
\`\`\`

You should see:
\`\`\`
✓ MongoDB connected successfully
🚀 Server running on http://localhost:5000
📦 API available at http://localhost:5000/api/products
\`\`\`

### Step 5: Open in Browser
- Open http://localhost:5000 in your web browser
- Start adding products!

## API Endpoints

### GET all products
\`\`\`
GET http://localhost:5000/api/products
\`\`\`

### GET single product
\`\`\`
GET http://localhost:5000/api/products/:id
\`\`\`

### CREATE product
\`\`\`
POST http://localhost:5000/api/products
Content-Type: application/json

{
  "name": "Product Name",
  "sku": "SKU123",
  "quantity": 10,
  "price": 29.99,
  "category": "Electronics"
}
\`\`\`

### UPDATE product
\`\`\`
PUT http://localhost:5000/api/products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "sku": "SKU123",
  "quantity": 15,
  "price": 39.99,
  "category": "Electronics"
}
\`\`\`

### DELETE product
\`\`\`
DELETE http://localhost:5000/api/products/:id
\`\`\`

## Troubleshooting

### "Cannot find module 'express'"
- Run: npm install

### "MongoDB connection error"
- Check if MongoDB is running
- Verify connection string in .env file
- For Atlas, ensure IP is whitelisted

### "Port 5000 already in use"
- Change PORT in .env file
- Or kill the process using port 5000

### CORS errors in browser
- CORS is already enabled in server.js
- Make sure you're accessing from http://localhost:5000

## Features
✓ Add new products with name, SKU, quantity, price, and category
✓ View all products in a table
✓ Edit existing products
✓ Delete products
✓ Real-time updates
✓ Input validation
✓ Responsive design
✓ MongoDB persistence

## Next Steps
- Add user authentication
- Implement product search/filter
- Add inventory alerts for low stock
- Create reports and analytics
- Deploy to production (Heroku, Railway, etc.)
