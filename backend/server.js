// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const emotionRoute = require("./routes/emotionRoute");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api", emotionRoute);

module.exports = app;
