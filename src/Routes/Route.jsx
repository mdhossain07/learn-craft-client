import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Teach from "../Pages/Teach/Teach";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import TeacherDashboardLayout from "../Layout/TeacherDashboardLayout";
import AddClass from "../Pages/Dashboard/Teacher/AddClass/AddClass";
import TeacherClass from "../Pages/Dashboard/Teacher/TeacherClass/TeacherClass";
import TeacherProfile from "../Pages/Dashboard/Teacher/TeacherProfile/TeacherProfile";
import UpdateClass from "../Pages/Dashboard/Teacher/UpdateClass/UpdateClass";
import ClassDetails from "../Pages/Dashboard/Teacher/ClassDetails/ClassDetails";
import StudentDashboardLayout from "../Layout/StudentDashboardLayout";
import EnrollClass from "../Pages/Dashboard/Student/EnrollClass";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout";
import Users from "../Pages/Dashboard/Admin/Users/Users";
import TeacherRequest from "../Pages/Dashboard/Admin/TeacherRequest/TeacherRequest";
import Classes from "../Pages/Classes/Classes";
import AllClasses from "../Pages/Dashboard/Admin/AllClasses/AllClasses";
import ClassInfo from "../Pages/ClassInfo/ClassInfo";

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
        element: <Classes />,
      },

      {
        path: "/teach",
        element: <Teach />,
      },
      {
        path: "/class-info/:id",
        element: <ClassInfo />,
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
      {
        path: "update-class/:id",
        element: <UpdateClass />,
      },
      {
        path: "class/:id",
        element: <ClassDetails />,
      },
    ],
  },
  {
    path: "/student",
    element: <StudentDashboardLayout />,
    children: [
      {
        path: "enroll-class",
        element: <EnrollClass />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "teacher-request",
        element: <TeacherRequest />,
      },
      {
        path: "all-classes",
        element: <AllClasses />,
      },
    ],
  },
]);

export default routes;
