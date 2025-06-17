import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { TbJewishStarFilled } from "react-icons/tb";
import { Link } from "react-router";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://hotel-hub-server.vercel.app/featured")
      .then((res) => setRooms(res.data));
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="my-10 px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6  text-gray-800 flex justify-center items-center gap-2">
            <span className="text-[#e4c22d]">
              <TbJewishStarFilled />
            </span>{" "}
            <span>Featured Rooms</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{room.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {room.shortDescription}
                  </p>
                  <p className="text-yellow-600 font-medium mb-1 flex items-center gap-2">
                    <FaStar /> {room.rating} | <FaSackDollar /> ${room.price}
                  </p>
                  <Link to={`/room/${room._id}`}>
                    <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedRooms;
