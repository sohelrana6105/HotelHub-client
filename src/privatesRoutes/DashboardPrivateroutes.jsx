import React, { use } from "react";
import { Authcontext } from "../context/Authcontext";
import { Navigate, useLocation } from "react-router";
import DashboardSkeleton from "../components/skeleton/DashboardSkeleton";

const DashboardPrivateroutes = ({ children }) => {
  const { user, loading } = use(Authcontext);
  const location = useLocation();
  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  return children;
};

export default DashboardPrivateroutes;
