const express = require("express");

const router = express.Router();

const {
  postLocation,
  getLocations,
} = require("../Controllers/locationController");

router.post("/", postLocation);
router.get("/", getLocations);

module.exports = router;
