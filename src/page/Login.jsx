import React, { use, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { Authcontext } from "../context/Authcontext";
import Swal from "sweetalert2";

const Login = () => {
  const navigation = useNavigate();
  const location = useLocation();
  console.log(location);

  const { signInUser, signInGoogleUser } = use(Authcontext);

  const [errorMessege, setErrorMessege] = useState("");
  const [succesMessege, setSuccesMessege] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    setErrorMessege("");
    setSuccesMessege("");
    if (!/\d/.test(password)) {
      return setErrorMessege("Must include at least one number.");
    }
    if (/[a-z]/.test(password) === false) {
      return setErrorMessege("Must include at least one lowercase letter.");
    }

    if (/[A-Z]/.test(password) === false) {
      return setErrorMessege("Must include at least one uppercase letter.");
    }

    if (password.length < 8) {
      return setErrorMessege("Must be at least 8 characters long.");
    }

    signInUser(email, password)
      .then(() => {
        setSuccesMessege("User Login succesfully !");
        toast.success("User Login succesfully !");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login succesfully !",
          showConfirmButton: false,
          timer: 1500,
        });
        return navigation(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setErrorMessege(error.message);
      });
  };

  const SignInGoogleHandler = () => {
    signInGoogleUser()
      .then(() => {
        setSuccesMessege("Sign In with Google succesfully");
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
        toast.success("Sign In with Google succesfully");
        return navigation(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(setErrorMessege(error.message));
      });
  };

  return (
    <>
      <div className="hero  mt-5 bg-[url('/login-logo.jpg')]">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body bg-[#589733]">
              <h1 className=" text-3xl font-bold text-white text-center mb-3">
                Login now
              </h1>
              <form
                onSubmit={loginHandler}
                className="form onSubmit={loginHanlder} space-y-3"
              >
                <label className="label text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label text-white">Email</label>
                <div className="relative">
                  <input
                    // type={showPassword ? "text" : "password"}
                    type="text"
                    name="password"
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <button
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    type="button"
                    className="absolute top-[30%] right-[10%]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div>
                  <a className="link link-hover text-white">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className="btn  text-white bg-[#206e01] border-none mt-4"
                >
                  Login
                </button>
              </form>
              <div
                onClick={SignInGoogleHandler}
                className="  mt-3  bg-white  rounded-2xl "
              >
                <button className="flex w-full justify-center items-center gap-2">
                  <span>
                    <FcGoogle size={20} />
                  </span>{" "}
                  <span className="text-xl text-black ">
                    Sign In With Google
                  </span>
                </button>
              </div>

              <p className="text-white">
                If you don't have account ? please{" "}
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    isActive ? "text-green-500" : "text-blue-400"
                  }
                >
                  <button className="btn text-white bg-[#206e01] border-none">
                    {" "}
                    Register
                  </button>
                </NavLink>
              </p>
              {errorMessege && (
                <p className="text-red-500 font-bold"> {errorMessege} </p>
              )}
              {succesMessege && (
                <p className="text-[#1ee096] ">{succesMessege} </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
