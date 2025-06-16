import React, { use } from "react";
import { Authcontext } from "../context/Authcontext";
import { useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(Authcontext);
  const location = useLocation();
  if (loading) {
    return <div className="flex justify-center"> ...loading</div>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to={"/signIn"}></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
