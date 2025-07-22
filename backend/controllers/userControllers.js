const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ─────────── REGISTER ─────────── */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).send("❌ Incomplete data.");

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .render("Register/Register", { error: "Email already registered" });
    }

    // Save user with hashed password
    const user = await new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();

    // JWT Token & Cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
    res.redirect("/?register=success");
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res
      .status(500)
      .render("Register/Register", { error: "Registration failed" });
  }
};

/* ─────────── LOGIN ─────────── */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .render("Login/Login", { error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
    res.redirect("/?login=success");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).render("Login/Login", { error: "Login failed" });
  }
};

/* ─────────── LOGOUT ─────────── */
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login?logout=success");
};

/* ─────────── HOME RENDER ─────────── */
exports.renderHome = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) {
      res.clearCookie("token");
      return res.redirect("/login");
    }

    const nameParts = user.username.trim().split(" ");
    const initials = nameParts
      .map((name) => name[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    res.render("Homepage/Home", {
      username: user.username,
      initials,
    });
  } catch (err) {
    console.error("Error rendering home:", err);
    res.redirect("/login");
  }
};

/* ─────────── MIDDLEWARES ─────────── */
exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.redirect("/"); // Already logged in
  } catch {
    res.clearCookie("token");
    return next();
  }
};
