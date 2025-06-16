import { format } from "date-fns";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink } from "react-router";

const MyBookingsRow = ({
  booking,
  BookingCancleHanlde,
  setShowReviewModal,
  setSelectedRoomId,
  setShowUpdateModal,
  setSelectedBookingDate,
}) => {
  //   console.log(booking);
  //   console.log(booking.roomId);
  // console.log(booking.rating);
  return (
    <tr className="bg-white border-b hover:bg-gray-50 ">
      <td className="px-4 py-3">
        <NavLink to={`/room/${booking.roomId}`}>
          <img
            src={booking.image}
            alt={booking.title}
            className="w-16 h-12 rounded object-cover"
          />
        </NavLink>
      </td>
      <td className="px-4 py-3 font-medium text-gray-800">{booking.title}</td>
      <td className="px-4 py-3">{booking.location}</td>
      <td className="px-4 py-3">
        {format(new Date(booking.bookingDate), "PPP")}
      </td>
      <td className="px-4 py-3 text-yellow-600  ">
        <span className="flex items-center gap-1">
          {" "}
          <FaStar /> {booking.rating}
        </span>
      </td>
      <td className="px-4 py-3 font-semibold text-gray-900">
        $ {booking.price}
      </td>
      <td className="px-4 py-3 text-center space-x-2">
        <button
          onClick={() => BookingCancleHanlde(booking.roomId)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow"
        >
          Cancel
        </button>
        {/* Optional: Review button */}
        <button
          onClick={() => {
            setSelectedRoomId(booking.roomId);
            setShowReviewModal(true);
          }}
          className="bg-[#3c9631] hover:bg-[#65be5a] text-white px-3 py-1 rounded text-xs shadow"
        >
          Review
        </button>
        {/* Update button */}
        <button
          onClick={() => {
            setSelectedRoomId(booking.roomId);
            setSelectedBookingDate(booking.bookingDate);
            setShowUpdateModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs shadow"
        >
          Update Date
        </button>
      </td>
    </tr>
  );
};

export default MyBookingsRow;
