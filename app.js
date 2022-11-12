const path = require("path");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {getClosesMatch} = require("./utils/levdist");

const app = express();

// ROUTE IMPORTS
const authRoutes = require("./routes/auth");
const scanRoutes = require("./routes/scan");

app.use(express.json());

// SETTING HEADERS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
});

// ADD ROUTES
app.use("/auth", authRoutes);
app.use(scanRoutes);

// ERROR HANDLING
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URI)
  .then((result) => {
    console.log("Connected");
    const server = app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });