const Location = require("../Models/Location");

const postLocation = async (req, res) => {
  const { name, email, lat, lng } = req.body;

  try {
    const newLocation = new Location({
      name,
      email,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    console.log(err);
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    res.json(locations);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postLocation, getLocations };
