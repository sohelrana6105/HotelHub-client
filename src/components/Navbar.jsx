import React, { use } from "react";
import { NavLink } from "react-router";
import { Authcontext } from "../context/Authcontext";
import { toast } from "react-toastify";
import HotelHubLogo from "../assets/logo-11-hotel.png";

const Navbar = () => {
  const { user, loading, signOutUser } = use(Authcontext);
  // console.log(user);
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home </NavLink>{" "}
      </li>

      <li>
        <NavLink to={"/rooms"}>Rooms </NavLink>{" "}
      </li>
      {user && (
        <li>
          <NavLink to={"/myBookings"}>My Bookings </NavLink>{" "}
        </li>
      )}
    </>
  );

  const signOutHandler = () => {
    signOutUser()
      .then(() => {
        toast.success("signout succesfully !");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
          <span>
            <img
              className="w-11 h-11"
              src={`${HotelHubLogo}`}
              alt="HotelHub logo"
            />
          </span>
          <span className="hidden md:block"> Hotel Hub</span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {user ? (
          <>
            <div className="navbar-end flex gap-4 ">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className=" m-1">
                  <div
                    className="tooltip tooltip-left "
                    data-tip={user.displayName}
                  >
                    <img
                      className="h-11 w-11  rounded-full"
                      src={user ? user.photoURL : "/default-users.webp"}
                      alt=""
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>{user.email}</li>
                  <li>
                    <NavLink to={"/login"}>
                      <button
                        onClick={signOutHandler}
                        className="px-5 py-1 rounded-xl hover:bg-[#65b898] bg-[#a618ca] text-white "
                      >
                        Sign Out
                      </button>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : loading ? (
          <div className="navbar-end ">
            <span className="loading loading-bars loading-xs "></span>
          </div>
        ) : (
          <>
            <div className="navbar-end flex gap-2">
              <NavLink to={"/login"}>
                <button className="btn">Login</button>
              </NavLink>
              <NavLink to={"/register"}>
                <button className="btn">Register</button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
