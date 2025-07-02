import axios from "axios";

const API_URL = "/api/locations";

export const createLocation = (locationData) => {
  return axios.post(API_URL, locationData);
};

export const getLocations = () => {
  return axios.get(API_URL);
};
