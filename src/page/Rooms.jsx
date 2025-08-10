import React, { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import axios from "axios";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Rooms = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [selectedRange, setSelectedRange] = useState("all");
  // console.log(selectedRange);

  useEffect(() => {
    setLoading(true);
    if (selectedRange === "all") {
      axios("https://hotel-hub-server.vercel.app/rooms").then((res) => {
        setRooms(res.data);
        setLoading(false);
      });
    } else {
      const [min, max] = selectedRange.split("-").map(Number);
      axios
        .get(
          `https://hotel-hub-server.vercel.app/rooms/filter?min=${min}&max=${max}`
        )
        .then((res) => {
          setRooms(res.data);
          setLoading(false);
        });
    }
  }, [selectedRange]);

  // if (loading) {
  //   return <LoadingSkeleton></LoadingSkeleton>;
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1>

      {/* 🔘 Price Filter */}
      <div className="mb-6 text-center">
        <label htmlFor="priceFilter" className="font-medium text-lg mr-2">
          Filter by Price:
        </label>
        <select
          id="priceFilter"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="all">All Prices</option>
          <option value="0-500">Under $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000-1500">$1000 - $1500</option>
          <option value="1500-5000">$1500 and above</option>
        </select>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rooms?.length > 0 &&
            rooms.map((room) => <RoomCard key={room._id} room={room} />)}
        </div>
      )}
    </div>
  );
};

export default Rooms;
