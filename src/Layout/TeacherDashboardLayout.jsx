import { Link, Outlet } from "react-router-dom";

const TeacherDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-red-500 ">
        <Link to="/teacher/add-class">
          <h2>Add Class</h2>
        </Link>

        <Link to="/teacher/my-class">
          <h2>Teacher Class</h2>
        </Link>

        <Link to="/teacher/profile">
          <h2>Teacher Profile</h2>
        </Link>
      </div>

      <div className="bg-green-500 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboardLayout;
