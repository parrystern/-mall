// 🏬 All Store Products
const storeProducts = {
  "fashion-hub": [
    { name: "T-Shirt", price: 19.99, image: "images/T-shirt1.jpg", category: "Shirts" },
    { name: "T-Shirt", price: 19.99, image: "images/t-shirt2.jpg", category: "Shirts" },
    { name: "Jeans", price: 39.99, image: "images/jeans.3.jpg", category: "Pants" },
    { name: "Jeans", price: 39.99, image: "images/Jeans.2.jpg", category: "Pants" }
  ],
  "tech-world": [
    { name: "Smartphone", price: 299.99, image: "images/R.jpeg", category: "Phones" },
    { name: "Smartphone", price: 300.99, image: "images/iphone.jpg", category: "Phones" },
    { name: "Smartphone", price: 400.99, image: "images/samsung.jpg", category: "Phones" },
    { name: "Headphones", price: 49.99, image: "images/headphones1.jpg", category: "Accessories" },
    { name: "Headphones", price: 36.99, image: "images/headphones2.jpg", category: "Accessories" },
    { name: "Laptop", price: 799.99, image: "images/laptop1.jpg", category: "Computers" },
    { name: "Laptop", price: 899.99, image: "images/laptop2.jpg", category: "Computers" }
  ],
  "glow-beauty": [
    { name: "Face Cream", price: 15.99, image: "images/facecream.jpg", category: "Skincare" },
    { name: "Lipstick", price: 9.99, image: "images/lipgloss.jpg", category: "Makeup" }
  ],
  "fresh-market": [
    { name: "Banana", price: 2.5, image: "images/Banana.jpeg", category: "Fruits" },
    { name: "Apple", price: 2.0, image: "images/apple.jpg", category: "Fruits" },
    { name: "Carrot", price: 1.5, image: "images/carrot.jpeg", category: "Vegetables" },
    { name: "Tomato", price: 3.0, image: "images/tomato.jpg", category: "Vegetables" }
  ],
  "home-comfort": [
    { name: "Sofa", price: 120.0, image: "images/sofa.jpg", category: "Furniture" },
    { name: "Curtains", price: 25.0, image: "images/curtains.jpg", category: "Decor" }
  ],
  "book-haven": [
    { name: "Novel", price: 10.0, image: "images/books_novels.jpg", category: "Books" },
    { name: "Workbook", price: 8.0, image: "images/R3.jpeg", category: "Books" }
  ]
};

// 🧠 Check if we are on store.html
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const storeKey = params.get("store");

  // Exit early if not on a store page
  if (!storeKey || !storeProducts[storeKey]) return;

  const storeData = storeProducts[storeKey];
  const storeName = storeKey.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  const storeTitle = document.getElementById("storeName");
  const productList = document.getElementById("productList");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  if (storeTitle) storeTitle.textContent = storeName;

  // 🏷️ Populate category dropdown
  const categories = ["all", ...new Set(storeData.map(p => p.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(opt);
  });

  // 🧱 Render Products
  function renderProducts(items) {
    productList.innerHTML = "";
    if (!items.length) {
      productList.innerHTML = "<p style='text-align:center;'>No products found.</p>";
      return;
    }

    items.forEach(product => {
      const card = document.createElement("div");
      card.className = "store-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-btn">Add to Cart</button>
      `;
      card.querySelector(".add-btn").addEventListener("click", () => addToCart(product));
      productList.appendChild(card);
    });
  }

  renderProducts(storeData);

  // 🔍 Search Filter
  searchInput.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = storeData.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  });

  // 🧭 Category Filter
  categoryFilter.addEventListener("change", e => {
    const cat = e.target.value;
    const filtered = cat === "all" ? storeData : storeData.filter(p => p.category === cat);
    renderProducts(filtered);
  });
});

// 🛒 Add to Cart (Global)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Optional: prevent duplicates
  const existing = cart.find(item => item.name === product.name && item.price === product.price);
  if (!existing) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  } else {
    alert(`${product.name} is already in your cart.`);
  }
}
