document.querySelectorAll(".reveal").forEach((el) => {
  function revealOnScroll() {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add("visible");
      window.removeEventListener("scroll", revealOnScroll);
    }
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
document.addEventListener("DOMContentLoaded", () => {
  fetch("/Data/Products.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load product data");
      }
      return res.json();
    })
    .then((data) => {
      displayProducts(data);
      setupSearchAndFilter(data);
    })
    .catch((err) => {
      console.error("Error loading products:", err);
      document.getElementById("no-products").style.display = "block";
    });
});

function displayProducts(products) {
  const grid = document.getElementById("products-grid");
  const noProducts = document.getElementById("no-products");

  grid.innerHTML = "";

  if (!products || products.length === 0) {
    noProducts.style.display = "block";
    return;
  }

  noProducts.style.display = "none";

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <img src="${product.img}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted mb-1">${product.category}</p>
          <p class="card-text fw-semibold">₹${product.price}</p>
          <button class="btn btn-primary mt-auto add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
}

function setupSearchAndFilter(products) {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  searchInput.addEventListener("input", () => {
    filterProducts(products);
  });

  categoryFilter.addEventListener("change", () => {
    filterProducts(products);
  });
}

function filterProducts(products) {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const categoryValue = document.getElementById("categoryFilter").value;

  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchValue);
    const matchesCategory = categoryValue === "" || product.category.toLowerCase() === categoryValue.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  displayProducts(filtered);
}
