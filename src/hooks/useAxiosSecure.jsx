import axios from "axios";
import React, { use } from "react";
import { Authcontext } from "../context/Authcontext";

const axiosInstance = axios.create({
  baseURL: "https://hotel-hub-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, SignOutUser } = use(Authcontext);

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  });
  //response interceptor
  axiosInstance.interceptors.response.use((response) => {
    return response;
  }),
    (error) => {
      if (error.status === 401 || error.status === 403) {
        SignOutUser.then(() => {
          console.log("Sign out user for 401 status code ");
        }).catch((error) => {
          console.log(error);
        });
      }
      return Promise.reject(error);
    };

  return axiosInstance;
};

export default useAxiosSecure;
