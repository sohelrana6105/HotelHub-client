import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import axios from "axios";

const BannerSlider = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/rooms").then((res) => {
      setTimeout(() => {
        setRooms(res.data);
        setLoading(false);
      }, 300);
    });
  }, []);

  return (
    <div className="relative z-0 w-full h-[40vh] md:h-[40vh] overflow-hidden">
      {/* Placeholder while loading */}
      {loading && <div className="w-full h-full bg-gray-200 animate-pulse" />}

      {/* Carousel only when rooms are available */}
      {!loading && rooms.length > 0 && (
        <div className="transition-opacity duration-700 ease-in-out opacity-100">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            transitionTime={700}
            swipeable
            emulateTouch
            stopOnHover={true}
          >
            {rooms.map((roomSingle, index) => (
              <div key={index} className="relative w-full h-[40vh] md:h-[40vh]">
                <img
                  src={roomSingle.image}
                  alt={`rooms ${index + 1}`}
                  loading="lazy"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-4">
                    {roomSingle.title}
                  </h2>
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-2xl drop-shadow mb-6">
                    {roomSingle.shortDescription}
                  </p>
                  <Link
                    to="/rooms"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm md:text-base px-6 py-3 rounded-full shadow-lg transition duration-300"
                  >
                    See Rooms
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
