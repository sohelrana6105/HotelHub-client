import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../page/Home/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import PrivateRoutes from "../privatesRoutes/PrivateRoutes";
import MyBookings from "../page/MyBookings";
import Rooms from "../page/Rooms";
import Notfound from "../page/Notfound";
import RoomDetails from "../page/RoomDetails";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../page/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    errorElement: <Notfound></Notfound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "rooms", Component: Rooms },
      { path: "room/:id", Component: RoomDetails },
      {
        path: "myBookings",
        element: (
          <PrivateRoutes>
            <MyBookings></MyBookings>
          </PrivateRoutes>
        ),
      },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
    ],
  },

  // Dashboard layout
  {
    path: "/dashboard",
    // Component: DashboardLayout,
    element: (
      <PrivateRoutes>
        <Rootlayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
]);
