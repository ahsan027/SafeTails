require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/database");

const locationRouter = require("./routes/locationroutes");

const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/locations", locationRouter);

app.listen(port, () => {
  console.log(`Server started Running at. ${port}`);
});
