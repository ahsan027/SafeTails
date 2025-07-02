import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { getLocations } from "../../services/locationService";
import { calculateDistance } from "../../utils/distanceCalculator";
import styles from "./MapDisplay.module.css";

// Fixed location (e.g., company HQ)
const FIXED_LOCATION = [51.5074, -0.1278]; // London

const MapDisplay = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLocations();
        setLocations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleLocationSelect = (loc) => {
    setSelectedLocation(loc);
    const [lng, lat] = loc.location.coordinates;
    const dist = calculateDistance(
      FIXED_LOCATION[0],
      FIXED_LOCATION[1],
      lat,
      lng
    );
    setDistance(dist.toFixed(2));
  };

  return (
    <div className={styles.container}>
      <h1>Location Map</h1>

      <div className={styles.layout}>
        <div className={styles.locationsList}>
          <h2>Saved Locations</h2>
          <ul>
            {locations.map((loc) => (
              <li
                key={loc._id}
                onClick={() => handleLocationSelect(loc)}
                className={
                  selectedLocation?._id === loc._id ? styles.selected : ""
                }
              >
                <strong>{loc.name}</strong>
                <p>{loc.email}</p>
              </li>
            ))}
          </ul>
          {distance && (
            <div className={styles.distanceInfo}>
              <h3>Distance from HQ</h3>
              <p>{distance} km</p>
            </div>
          )}
        </div>

        <div className={styles.mapContainer}>
          <MapContainer
            center={FIXED_LOCATION}
            zoom={12}
            className={styles.map}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker position={FIXED_LOCATION}>
              <Popup>Company HQ</Popup>
            </Marker>

            {locations.map((loc) => {
              const [lng, lat] = loc.location.coordinates;
              return (
                <Marker
                  key={loc._id}
                  position={[lat, lng]}
                  eventHandlers={{ click: () => handleLocationSelect(loc) }}
                >
                  <Popup>
                    {loc.name}
                    <br />
                    {loc.email}
                  </Popup>
                </Marker>
              );
            })}

            {selectedLocation &&
              (() => {
                const [lng, lat] = selectedLocation.location.coordinates;
                return (
                  <Polyline
                    positions={[FIXED_LOCATION, [lat, lng]]}
                    color="blue"
                  />
                );
              })()}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapDisplay;
