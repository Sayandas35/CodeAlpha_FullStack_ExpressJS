const express = require("express");
const router = express.Router();
const auth = require("../controllers/userControllers");
const User = require("../Models/User");
const { isAuthenticated, isLoggedIn } = auth;

/* ─────────── AUTH ROUTES ─────────── */
router.post("/register", express.urlencoded({ extended: false }), auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

/* ─────────── HOME (PROTECTED) ─────────── */
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();

    if (!user) {
      res.clearCookie("token");
      return res.redirect("/login");
    }

    const fullName = user.username || "";
    const nameParts = fullName.trim().split(" ");
    const initials = nameParts.map(name => name[0]).slice(0, 2).join("").toUpperCase();

    res.render("Homepage/Home", {
      username: user.username,
      initials
    });
  } catch (err) {
    console.error("⚠️ Error fetching user for homepage:", err);
    res.redirect("/login");
  }
});

/* ─────────── PUBLIC PAGES ─────────── */
router.get("/about", (req, res) => res.render("Aboutpage/About"));
router.get("/contact", (req, res) => res.render("Contactpage/Contact"));
router.get("/products", (req, res) => res.render("Productspage/Products"));

/* ─────────── PROTECTED PAGES ─────────── */
router.get("/cart", isAuthenticated, (req, res) => res.render("Cartpage/Cart"));
router.get("/payment", isAuthenticated, (req, res) => res.render("Paymentpage/Payment"));

/* ─────────── LOGIN/REGISTER BLOCKED IF LOGGED IN ─────────── */
router.get("/register", isLoggedIn, (req, res) => res.render("Register/Register"));
router.get("/login", isLoggedIn, (req, res) => res.render("Login/Login"));

module.exports = router;
