require("dotenv").config;

const express = require("express");

const connectDB = require("./config/database");

const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.listen(port, () => {
  console.log(`Server started Running at. ${port}`);
});
