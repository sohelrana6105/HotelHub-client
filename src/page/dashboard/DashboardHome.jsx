import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBed, FaCalendarCheck } from "react-icons/fa";

const DashboardHome = () => {
  const [dashboardData, setDashboardData] = useState({
    roomsCount: 0,
    bookingsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://hotel-hub-server.vercel.app/dashboard-information")
      .then((res) => {
        setDashboardData({
          roomsCount: res.data.roomsCount,
          bookingsCount: res.data.bookingsCount,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { roomsCount, bookingsCount } = dashboardData;

  const bookingRate = roomsCount
    ? Math.min(((bookingsCount / roomsCount) * 100).toFixed(1), 100)
    : 0;

  const currentDate = new Date().toLocaleString();

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard data...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl lg:text-5xl font-bold mb-2 text-gray-800">
        Welcome to Your Dashboard
      </h2>
      <p className="text-gray-600 mb-8 text-lg lg:text-xl">
        Today is {currentDate}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Rooms Card */}
        <div className="bg-green-100 rounded-lg p-6 lg:p-10 shadow-md flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer min-h-[220px] lg:min-h-[280px]">
          <FaBed className="text-green-700 text-5xl lg:text-7xl mb-3" />
          <h3 className="text-xl lg:text-3xl font-semibold mb-2">
            Total Rooms
          </h3>
          <p className="text-4xl lg:text-6xl font-bold text-green-700">
            {roomsCount}
          </p>
        </div>

        {/* Bookings Card */}
        <div className="bg-blue-100 rounded-lg p-6 lg:p-10 shadow-md flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer min-h-[220px] lg:min-h-[280px]">
          <FaCalendarCheck className="text-blue-700 text-5xl lg:text-7xl mb-3" />
          <h3 className="text-xl lg:text-3xl font-semibold mb-2">
            Total Bookings
          </h3>
          <p className="text-4xl lg:text-6xl font-bold text-blue-700">
            {bookingsCount}
          </p>
        </div>

        {/* Booking Rate Card */}
        <div className="bg-yellow-100 rounded-lg p-6 lg:p-10 shadow-md flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer min-h-[220px] lg:min-h-[280px]">
          <h3 className="text-xl lg:text-3xl font-semibold mb-4 text-center">
            Booking Rate
          </h3>
          <div className="w-full bg-yellow-300 rounded-full h-6 lg:h-8 overflow-hidden">
            <div
              className="bg-yellow-500 h-6 lg:h-8 rounded-full transition-width duration-500"
              style={{ width: `${bookingRate}%` }}
            />
          </div>
          <p className="text-center mt-2 font-bold text-yellow-700 text-lg lg:text-2xl">
            {bookingRate}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
