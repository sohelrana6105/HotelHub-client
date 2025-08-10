import React from "react";

const BookingSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold  mb-8">My Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">IMAGE</th>
              <th className="px-4 py-2">TITLE</th>
              <th className="px-4 py-2">LOCATION</th>
              <th className="px-4 py-2">DATE</th>
              <th className="px-4 py-2">RATING</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(2)].map((_, index) => (
              <tr key={index} className="border-t animate-pulse">
                {/* Image Skeleton */}
                <td className="px-4 py-4">
                  <div className="w-16 h-12 bg-gray-200 rounded" />
                </td>

                {/* Title Skeleton */}
                <td className="px-4 py-4">
                  <div className="w-24 h-4 bg-gray-200 rounded mb-1" />
                </td>

                {/* Location Skeleton */}
                <td className="px-4 py-4">
                  <div className="w-20 h-4 bg-gray-200 rounded mb-1" />
                </td>

                {/* Date Skeleton */}
                <td className="px-4 py-4">
                  <div className="w-28 h-4 bg-gray-200 rounded mb-1" />
                </td>

                {/* Rating Skeleton */}
                <td className="px-4 py-4">
                  <div className="w-10 h-4 bg-gray-200 rounded" />
                </td>

                {/* Price Skeleton */}
                <td className="px-4 py-4">
                  <div className="w-14 h-4 bg-gray-200 rounded" />
                </td>

                {/* Action Buttons Skeleton */}
                <td className="px-4 py-4 flex gap-2">
                  <div className="w-12 h-8 bg-gray-200 rounded" />
                  <div className="w-12 h-8 bg-gray-200 rounded" />
                  <div className="w-20 h-8 bg-gray-200 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingSkeleton;
