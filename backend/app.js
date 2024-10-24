require("dotenv").config();
const connectDB = require("../backend/src/config/db");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { unknownEndpoint, errorHandler} = require("./src/middlewares/customMiddleware.js");
const statusMonitor = require("express-status-monitor");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger/swagger.yaml");

const formRoutes = require("./src/routes/formRoutes")
// const userRoutes = require("./src/routes/userRoutes") // Not implemented yet


const path = require("path");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local frontend
      "https://jobscout-frontend.onrender.com", // Deployed 
    ],
    credentials: true, // Required if sending cookies or using sessions
  })
);

app.use(helmet()); // Adding Helmet for security

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs. Currently per 15min
  message: "Too many requests, please try again later.",
});

app.use(express.json());

app.use(statusMonitor());
app.use(morgan("dev"));

connectDB();

// Routers
// app.use("/admin", userRoutes);
app.use("/carOffer", formRoutes);


// Example route that throws an error
app.get("/error", (req, res, next) => {
  // Trigger an error
  const error = new Error("Something went wrong!");
  next(error);
});

app.get("/", (req, res) => {
  res.json({ message: "API is Running!" });
});

// Use the unknownEndpoint middleware for handling undefined routes
app.use(unknownEndpoint);
// Use the errorHandler middleware for handling errors
app.use(errorHandler);

module.exports = app;
