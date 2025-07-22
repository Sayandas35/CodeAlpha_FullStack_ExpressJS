document.querySelectorAll('.reveal').forEach(el => {
  function revealOnScroll() {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
      window.removeEventListener('scroll', revealOnScroll);
    }
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});

// Cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart");
const subtotalElem = document.getElementById("subtotal");
const taxElem = document.getElementById("tax");
const shippingElem = document.getElementById("shipping");
const totalElem = document.getElementById("total");

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    document.getElementById("cart-summary").style.display = "none";
    return;
  }

  emptyCartMessage.style.display = "none";
  document.getElementById("cart-summary").style.display = "block";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "card mb-3";
    row.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-3">
          <img src="${item.img}" class="img-fluid rounded-start" alt="${item.name}">
        </div>
        <div class="col-9">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-muted">${item.brand}</p>
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <button class="btn btn-sm btn-outline-secondary me-1" onclick="updateQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="btn btn-sm btn-outline-secondary ms-1" onclick="updateQty(${index}, 1)">+</button>
              </div>
              <div class="fw-bold">$${(item.price * item.qty).toFixed(2)}</div>
              <button class="btn btn-sm btn-danger" onclick="removeItem(${index})"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  updateSummary();
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function updateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cart.length > 0 ? 5.99 : 0;
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
  shippingElem.textContent = `$${shipping.toFixed(2)}`;
  taxElem.textContent = `$${tax.toFixed(2)}`;
  totalElem.textContent = `$${total.toFixed(2)}`;
}

// On load
renderCart();
