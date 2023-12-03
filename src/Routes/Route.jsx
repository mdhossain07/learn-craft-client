import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses";
import Teach from "../Pages/Teach/Teach";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import TeacherDashboardLayout from "../Layout/TeacherDashboardLayout";
import AddClass from "../Pages/Dashboard/Teacher/AddClass/AddClass";
import TeacherClass from "../Pages/Dashboard/Teacher/TeacherClass/TeacherClass";
import TeacherProfile from "../Pages/Dashboard/Teacher/TeacherProfile/TeacherProfile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },

      {
        path: "/teach",
        element: <Teach />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/teacher",
    element: <TeacherDashboardLayout />,
    children: [
      {
        path: "add-class",
        element: <AddClass />,
      },

      {
        path: "my-class",
        element: <TeacherClass />,
      },

      {
        path: "profile",
        element: <TeacherProfile />,
      },
    ],
  },
]);

export default routes;
