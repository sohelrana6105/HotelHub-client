import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-6 animate-pulse"
          >
            <div className="h-40 bg-gray-200 rounded mb-4" />{" "}
            {/* Image placeholder */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />{" "}
            {/* Title placeholder */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />{" "}
            {/* Subtitle placeholder */}
            <div className="h-10 bg-gray-200 rounded w-full" />{" "}
            {/* Button or action placeholder */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
