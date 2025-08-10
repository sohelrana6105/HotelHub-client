import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar skeleton */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-4 shadow-md">
        <div className="h-8 bg-gray-300 rounded w-24 mb-6 animate-pulse"></div>
        <nav className="space-y-4 flex-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"
            ></div>
          ))}
        </nav>
        <div className="h-6 bg-gray-300 rounded w-full mt-auto animate-pulse"></div>
      </aside>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header skeleton */}
        <header className="flex items-center justify-between bg-gray-100 p-4 md:hidden sticky top-0 z-10 shadow-sm">
          <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
          <div className="w-6"></div>
        </header>

        {/* Content area skeleton */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="h-8 bg-gray-300 rounded w-48 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-6 bg-gray-300 rounded w-full max-w-3xl animate-pulse"
              ></div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
