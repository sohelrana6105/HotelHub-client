import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Branding / Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-2">HotelHub</h2>
          <p className="text-gray-400 max-w-xs">
            Experience comfort and elegance in every corner. Book your perfect
            stay with ease.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-yellow-400">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms" className="hover:text-yellow-400">
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink to="/mybookings" className="hover:text-yellow-400">
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-yellow-400">Contact</NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Connect with Us</h3>
          <div className="flex gap-4 text-lg">
            <NavLink
              to="https://facebook.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaFacebookF />
            </NavLink>
            <NavLink
              to="https://twitter.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </NavLink>
            <NavLink
              to="https://instagram.com"
              target="_blank"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </NavLink>
            <NavLink
              to="https://linkedin.com"
              target="_blank"
              className="hover:text-blue-300"
            >
              <FaLinkedinIn />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} HotelHub. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
