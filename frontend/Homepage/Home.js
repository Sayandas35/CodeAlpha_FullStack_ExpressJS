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
// Home.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".add-to-cart");
  if (btn) {
    const card = btn.closest(".card");
    const name = card.querySelector(".card-title").textContent;
    const brand =
      card.querySelector(".card-text.text-muted")?.textContent || "";
    const description =
      card.querySelectorAll(".card-text")[1]?.textContent || "";
    const img = card.querySelector("img")?.src || "/assets/default.png";
    const priceText =
      card.querySelector(".fw-bold.text-primary")?.textContent || "$0";
    const price = parseFloat(priceText.replace("$", "")) || 0;

    const existingIndex = cart.findIndex((item) => item.name === name);
    if (existingIndex >= 0) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ name, brand, description, img, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelector(".cart-count").textContent = totalItems;
  }
});

// Show current cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelector(".cart-count").textContent = totalItems;
});
