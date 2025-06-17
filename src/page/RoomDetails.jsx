import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FcRating } from "react-icons/fc";
import { NavLink, useParams } from "react-router";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Authcontext } from "../context/Authcontext";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useContext(Authcontext);
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());

  useEffect(() => {
    axios
      .get(`https://hotel-hub-server.vercel.app/rooms/${id}`)
      .then((res) => setRoom(res.data));
    axios
      .get(`https://hotel-hub-server.vercel.app/rooms/${id}/reviews`)
      .then((res) => setReviews(res.data));
  }, [id]);
  // console.log(room);
  // console.log(reviews);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    const newReview = {
      user: user.displayName,
      userEmail: user.email,
      rating,
      comment,
      timestamp: new Date(),
    };

    console.log(newReview);

    const allReviews = [...reviews, newReview];
    const ratingsArray = allReviews.map((r) => Number(r.rating));
    // here acc= sum of every acc  curr = rating value
    const totalRating = ratingsArray.reduce((acc, curr) => acc + curr, 0);
    const avgrating = parseFloat(
      (totalRating / ratingsArray.length).toFixed(1)
    );

    // update room rating
    console.log();

    if (room.availability === false) {
      console.log("dhur");
      setRoom((prev) => {
        return { ...prev, rating: avgrating };
      });
    }
    try {
      const res = await axios.post(
        `https://hotel-hub-server.vercel.app/rooms/${id}/review`,
        newReview
      );

      if (res.data?.result?.modifiedCount > 0) {
        setReviews((prev) => {
          return [...prev, newReview];
        });
        form.reset();
        setShowReviewModal(false);
        Swal.fire("Review Submitted!", "", "success");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 403) {
        setShowReviewModal(false);

        Swal.fire(
          "Permission Denied",
          "You must book this room before reviewing."
        );
      } else {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const handleBookingConfirm = async () => {
    const formattedDate = format(bookingDate, "yyyy-MM-dd");
    const bookingInfo = {
      user: user.displayName,
      userEmail: user.email,

      roomId: id,
      bookingDate: formattedDate,
      image: room.image,
      title: room.title,
      location: room.location,
      rating: room.rating,
      price: room.price,
    };
    console.log(bookingInfo);
    const res = await axios.post(
      "https://hotel-hub-server.vercel.app/bookings",
      bookingInfo
    );
    console.log("bookings info send", res.data);
    if (res.data?.insertedId) {
      await axios
        .patch(`https://hotel-hub-server.vercel.app/rooms/${id}/availability`, {
          availability: false,
        })
        .then((res) => console.log("patch method works and update", res.data))
        .catch((error) => console.log(error));
      setRoom((prev) => ({ ...prev, availability: false }));
      setShowBookingModal(false);
      Swal.fire("Booking Successful!", "", "success");
    }
  };

  const deleteReview = (timestamp) => {
    axios
      .delete(`https://hotel-hub-server.vercel.app/rooms/${id}/review`, {
        data: {
          userEmail: user.email,
          timestamp: timestamp,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.result?.modifiedCount > 0) {
          setReviews((prev) => prev.filter((r) => r.timestamp !== timestamp));
          const UpdateRating = res.data.updateRatings.rating;

          setRoom((prev) => {
            return { ...prev, rating: UpdateRating };
          });

          Swal.fire("Deleted!", "Review has been removed.", "success");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to delete review.", "error");
      });
  };

  if (!room) {
    return (
      <div className="flex justify-center my-12">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <img
        src={room.image}
        alt={room.title}
        className="w-full h-[400px] object-cover rounded-xl shadow-md"
      />

      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <h2 className="text-3xl font-bold text-gray-800">{room.title}</h2>
        <p className="text-xl font-semibold text-indigo-600">
          ${room.price}/night
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-6 text-gray-600 text-sm">
        <p className="flex items-center">
          <FaLocationDot />
          <span className="font-medium text-gray-800 ml-1">Location:</span>{" "}
          {room.location}
        </p>
        <p>
          <span className="font-medium text-gray-800"> Availability:</span>
          <span
            className={`ml-1 font-semibold ${
              room.availability ? "text-green-600" : "text-red-500"
            }`}
          >
            {room.availability ? "Available" : "Booked"}
          </span>
        </p>
        <p className="flex items-center gap-1">
          <FcRating />
          <span className="font-medium text-gray-800">Rating:</span>{" "}
          {room.rating}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed">{room.longDescription}</p>
      </div>

      {/* Reviews */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          User Reviews
        </h3>
        {reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded shadow-sm flex justify-between items-center"
              >
                <div className="">
                  <p className="font-medium text-gray-700">{review.user}</p>
                  <p className="text-yellow-600">⭐ {review.rating}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.timestamp).toLocaleString()}
                  </p>
                </div>
                <div>
                  {user && (
                    <button
                      className="btn btn-error"
                      onClick={() => deleteReview(review.timestamp)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-gray-500">No reviews yet.</p>
        )}

        {user ? (
          <button
            onClick={() => setShowReviewModal(true)}
            className="btn btn-outline mt-4"
          >
            Give Review
          </button>
        ) : (
          <NavLink to={"/login"}>
            {" "}
            <button className="btn btn-outline mt-4">Give Review</button>
          </NavLink>
        )}
      </div>

      {/* User post  Review Modal */}
      {showReviewModal && (
        <div className="modal modal-open overflow-visible z-[9999]">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <input
                name="userName"
                type="text"
                value={user.displayName}
                readOnly
                className="input w-full mb-2"
              />
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                placeholder="Rating 1 to 5 "
                required
                className="input w-full mb-2"
              />
              <textarea
                name="comment"
                placeholder="Write your review..."
                required
                className="textarea w-full mb-2"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Button */}
      <div className="mt-8">
        {user ? (
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-300"
            disabled={!room.availability}
          >
            {room.availability ? "Book Now" : "Currently Unavailable"}
          </button>
        ) : (
          <NavLink to={"/login"}>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-300"
              disabled={!room.availability}
            >
              {room.availability ? "Book Now" : "Currently Unavailable"}
            </button>
          </NavLink>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal modal-open overflow-visible z-[9999]">
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-2">Confirm Booking</h3>
            <p>
              <strong>Room:</strong> {room.title}
            </p>
            <p>
              <strong>Price:</strong> ${room.price}
            </p>
            <p>
              <strong>Description:</strong> {room.shortDescription}
            </p>
            <div className="my-2 ">
              <label className="font-semibold ">Select Booking Date:</label>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                dateFormat="yyyy-MM-dd"
                className="input w-full border rounded p-2 "
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport",
                    },
                  },
                ]}
              />
            </div>
            <div className="modal-action">
              <button
                onClick={handleBookingConfirm}
                className="btn btn-success"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
