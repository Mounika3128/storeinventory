const API_URL = "http://localhost:5000/api/products"

// DOM Elements
const productForm = document.getElementById("productForm")
const editForm = document.getElementById("editForm")
const productsTable = document.getElementById("productsTable")
const productsBody = document.getElementById("productsBody")
const loadingMessage = document.getElementById("loadingMessage")
const emptyMessage = document.getElementById("emptyMessage")
const editModal = document.getElementById("editModal")
const closeBtn = document.querySelector(".close")

// Event Listeners
productForm.addEventListener("submit", handleAddProduct)
editForm.addEventListener("submit", handleEditProduct)
closeBtn.addEventListener("click", closeEditModal)
window.addEventListener("click", (e) => {
  if (e.target === editModal) closeEditModal()
})

// Load products on page load
document.addEventListener("DOMContentLoaded", loadProducts)

// Load all products
async function loadProducts() {
  try {
    loadingMessage.style.display = "block"
    productsTable.style.display = "none"
    emptyMessage.style.display = "none"

    const response = await fetch(API_URL)
    if (!response.ok) throw new Error("Failed to load products")

    const products = await response.json()
    loadingMessage.style.display = "none"

    if (products.length === 0) {
      emptyMessage.style.display = "block"
      return
    }

    productsBody.innerHTML = ""
    products.forEach((product) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td>${product.quantity}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.category}</td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-edit" onclick="openEditModal('${product._id}')">Edit</button>
            <button class="btn btn-delete" onclick="deleteProduct('${product._id}')">Delete</button>
          </div>
        </td>
      `
      productsBody.appendChild(row)
    })

    productsTable.style.display = "table"
  } catch (error) {
    console.error("Error loading products:", error)
    loadingMessage.textContent = "Error loading products. Please try again."
  }
}

// Add new product
async function handleAddProduct(e) {
  e.preventDefault()

  const product = {
    name: document.getElementById("name").value,
    sku: document.getElementById("sku").value,
    quantity: Number.parseInt(document.getElementById("quantity").value),
    price: Number.parseFloat(document.getElementById("price").value),
    category: document.getElementById("category").value,
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      const error = await response.json()
      alert("Error: " + error.error)
      return
    }

    productForm.reset()
    loadProducts()
    alert("Product added successfully!")
  } catch (error) {
    console.error("Error adding product:", error)
    alert("Error adding product. Please try again.")
  }
}

// Open edit modal
async function openEditModal(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) throw new Error("Failed to load product")

    const product = await response.json()

    document.getElementById("editId").value = product._id
    document.getElementById("editName").value = product.name
    document.getElementById("editSku").value = product.sku
    document.getElementById("editQuantity").value = product.quantity
    document.getElementById("editPrice").value = product.price
    document.getElementById("editCategory").value = product.category

    editModal.style.display = "block"
  } catch (error) {
    console.error("Error loading product:", error)
    alert("Error loading product. Please try again.")
  }
}

// Close edit modal
function closeEditModal() {
  editModal.style.display = "none"
  editForm.reset()
}

// Edit product
async function handleEditProduct(e) {
  e.preventDefault()

  const id = document.getElementById("editId").value
  const product = {
    name: document.getElementById("editName").value,
    sku: document.getElementById("editSku").value,
    quantity: Number.parseInt(document.getElementById("editQuantity").value),
    price: Number.parseFloat(document.getElementById("editPrice").value),
    category: document.getElementById("editCategory").value,
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      const error = await response.json()
      alert("Error: " + error.error)
      return
    }

    closeEditModal()
    loadProducts()
    alert("Product updated successfully!")
  } catch (error) {
    console.error("Error updating product:", error)
    alert("Error updating product. Please try again.")
  }
}

// Delete product
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to delete product")

    loadProducts()
    alert("Product deleted successfully!")
  } catch (error) {
    console.error("Error deleting product:", error)
    alert("Error deleting product. Please try again.")
  }
}
