require("dotenv").config(); // Load .env first

const express = require("express");
const path = require("path");
const app = express();

const userRoutes = require("./routes/userRoutes");
const connectDB = require("./database/db");

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "../frontend"));

connectDB();


app.use("/", userRoutes);

module.exports = app;
