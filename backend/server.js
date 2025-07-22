require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "../frontend"));
app.use(express.static(path.join(__dirname, "../frontend/Homepage")));
app.use(express.static(path.join(__dirname, "../frontend/Login")));
app.use(express.static(path.join(__dirname, "../frontend/Register")));
app.use(express.static(path.join(__dirname, "../frontend/Aboutpage")));
app.use(express.static(path.join(__dirname, "../frontend/Cartpage")));
app.use(express.static(path.join(__dirname, "../frontend/Contactpage")));
app.use(express.static(path.join(__dirname, "../frontend/PaymentPage")));
app.use(express.static(path.join(__dirname, "../frontend/productspage")));
app.use("/data", express.static(path.join(__dirname, "../frontend/Data")));


app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
