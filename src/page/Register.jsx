import React, { use, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router";
import { Authcontext } from "../context/Authcontext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, signInGoogleUser, updateUserProfile, setUser, user } =
    use(Authcontext);
  const navigation = useNavigate();

  const [errorMessege, setErrorMessege] = useState("");
  const [succesMessege, setSuccesMessege] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const registerHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormdata } = Object.fromEntries(formData);
    console.log(email, password);
    console.log(restFormdata);

    const { name, inputurl } = restFormdata;

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

    // create user with firebase
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, inputurl)
          .then(() => {
            setUser(...user, { displayName: name, photoURL: inputurl });
            console.log("User created succensfully");
          })
          .catch((error) => error.message);
        // save profile info in the db
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessege(error.message);
      });
    navigation("/");
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
        // return navigation(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(setErrorMessege(error.message));
      });
  };

  return (
    <>
      <div className="hero  py-10 bg-[url('/register-logo.jpg')]">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body bg-[#89b635]">
              <h1 className=" text-3xl font-bold text-white text-center mb-3">
                Register now
              </h1>
              <form
                onSubmit={registerHandler}
                className="form onSubmit={loginHanlder} space-y-3"
              >
                <label className="label text-white">User Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name"
                  required
                />
                <label className="label text-white"> Upload Photo url</label>
                <input
                  type="url"
                  name="inputurl"
                  className="input"
                  placeholder="Photo Url"
                  required
                />
                <label className="label text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />{" "}
                <label className="label text-white">password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
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
                <button
                  type="submit"
                  className="text-white btn bg-[#5a7914] border-none mt-4 "
                >
                  Register
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
                Already hav an account ? please{" "}
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive ? "text-green-500" : "text-blue-400"
                  }
                >
                  <button className="btn text-white bg-[#4a6310] border-none">
                    {" "}
                    Login
                  </button>
                </NavLink>
              </p>
              {errorMessege && (
                <p className="text-[#a81313] text-lg font-bold">
                  {" "}
                  {errorMessege}{" "}
                </p>
              )}

              {succesMessege && (
                <p className="text-[#098a04] text-lg">{succesMessege} </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
