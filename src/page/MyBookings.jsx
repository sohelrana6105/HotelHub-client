import React, { use, useEffect, useState } from "react";
import { Authcontext } from "../context/Authcontext";
import axios from "axios";

import MyBookingsRow from "./MyBookingsRow";
import Swal from "sweetalert2";
import { format } from "date-fns";

const MyBookings = () => {
  const { user } = use(Authcontext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBookingDate, setSelectedBookingDate] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-bookings?email=${user.email}`)
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        });
    }
  }, [user]);
  console.log(bookings);

  const BookingCancleHanlde = (roomId) => {
    // console.log("myBookings works");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/bookings/${roomId}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0 && res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });

        const filterBookings = bookings.filter((b) => b.roomId !== roomId);
        setBookings(filterBookings);
      }
    });
  };

  const handleReviewSubmitAgain = async (e) => {
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

    if (!selectedRoomId) {
      return Swal.fire("Error", "No room selected for review!", "error");
    }

    // }
    try {
      const res = await axios.post(
        `http://localhost:3000/rooms/${selectedRoomId}/review`,
        newReview
      );

      if (res.data?.result?.modifiedCount > 0) {
        form.reset();

        const UpdateRating = res.data.avgRating.rating;
        setBookings((prev) =>
          prev.map((booked) =>
            booked.roomId === selectedRoomId
              ? { ...booked, rating: UpdateRating }
              : booked
          )
        );

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

  const handleBookingDateUpdate = async (e, roomId) => {
    e.preventDefault();
    const newDate = e.target.newDate.value;

    try {
      const res = await axios.patch(
        `http://localhost:3000/bookings/${roomId}`,
        {
          newDate,
          email: user.email,
        }
      );

      if (res.data.modifiedCount > 0) {
        setBookings((prev) =>
          prev.map((b) =>
            b.roomId === roomId ? { ...b, bookingDate: newDate } : b
          )
        );
        setShowUpdateModal(false);

        Swal.fire("Success", "Booking date updated!", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update booking date", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-12">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">You haven't booked any rooms yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-600 border border-gray-200">
            <thead className="bg-indigo-50 text-gray-800 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => (
                <MyBookingsRow
                  key={i}
                  booking={booking}
                  BookingCancleHanlde={BookingCancleHanlde}
                  setShowReviewModal={setShowReviewModal}
                  setSelectedRoomId={setSelectedRoomId}
                  setSelectedBookingDate={setSelectedBookingDate}
                  setShowUpdateModal={setShowUpdateModal}
                ></MyBookingsRow>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* show Review modal  again*/}

      {showReviewModal && (
        <div className="modal modal-open overflow-visible z-[9999]">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add a Review</h3>
            <form onSubmit={handleReviewSubmitAgain}>
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

      {/*  show booking moda again  */}

      {showUpdateModal && (
        <div className="modal modal-open z-[9999]">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Booking Date</h3>
            <form
              onSubmit={(e) => handleBookingDateUpdate(e, selectedRoomId)}
              className="space-y-4"
            >
              <input
                type="date"
                name="newDate"
                defaultValue={format(
                  new Date(selectedBookingDate),
                  "yyyy-MM-dd"
                )}
                required
                className="input w-full"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="btn"
                  type="button"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
