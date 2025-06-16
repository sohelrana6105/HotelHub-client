import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDetails = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg my-10">
      <MapContainer
        center={[23.8103, 90.4125]} // Example: Dhaka
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
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
