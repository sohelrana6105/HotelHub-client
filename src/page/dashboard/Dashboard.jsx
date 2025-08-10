import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { NavLink, Outlet } from "react-router";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Common class function for active links
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition
     ${
       isActive
         ? "bg-blue-100 text-blue-700 font-semibold"
         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
     }`;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-30 w-64 bg-white shadow-md
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-extrabold text-blue-600">
            HotelHub
          </NavLink>
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(false)}
            aria-label="Close drawer"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <span className="text-lg">
              <AiOutlineHome />
            </span>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/dashboard/myprofile"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <span className="text-lg">
              <AiOutlineInfoCircle />
            </span>
            <span>Profile</span>
          </NavLink>

          {/* Add more NavLink here if needed */}
        </nav>

        {/* Footer */}
        <footer className="p-4 border-t text-center text-sm text-gray-500">
          © 2025 Your Company
        </footer>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="flex items-center gap-3 bg-gray-100 p-4 md:hidden sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open drawer"
            className="text-gray-700 focus:outline-none focus:ring focus:ring-blue-400 rounded"
          >
            <RxHamburgerMenu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div></div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-8 max-w-7xl mx-auto overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
