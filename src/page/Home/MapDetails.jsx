import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// 🛠 Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapDetails = () => {
  return (
    <div className="relative my-10 h-[400px]">
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 0, // ⬅️ forces map to be under navbar
        }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.8103, 90.4125]}>
          <Popup>
            Welcome to <strong>HotelHub</strong>! <br />
            Your dream stay starts here.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapDetails;
