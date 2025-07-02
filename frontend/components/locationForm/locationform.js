import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { createLocation } from "../../services/locationService";
import styles from "./LocationForm.module.css";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom component to handle map click
const ClickHandler = ({ setMarker, setPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setMarker([lat, lng]);
    },
  });
  return null;
};

const LocationForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [position, setPosition] = useState([51.505, -0.09]);
  const [marker, setMarker] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLocation({
        ...formData,
        lat: position[0],
        lng: position[1],
      });
      alert("Location saved successfully!");
      setFormData({ name: "", email: "" });
      setMarker(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save location.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Location Picker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className={styles.inputField}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <div className={styles.mapContainer}>
          <MapContainer center={position} zoom={13} className={styles.map}>
            <ClickHandler setPosition={setPosition} setMarker={setMarker} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {marker && (
              <Marker position={marker}>
                <Popup>Selected Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <button type="submit" className={styles.submitButton}>
          Save Location
        </button>
      </form>
    </div>
  );
};

export default LocationForm;
