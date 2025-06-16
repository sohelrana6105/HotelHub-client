import React, { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios("http://localhost:3000/rooms").then((res) => setRooms(res.data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
