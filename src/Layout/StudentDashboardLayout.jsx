import { Link, Outlet } from "react-router-dom";

const StudentDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-gray-200 p-2">
        <Link to="/student/enroll-class">
          <h2>My Enroll Class</h2>
        </Link>

        {/* <Link to="/teacher/profile">
          <h2>Student Profile</h2>
        </Link> */}
      </div>

      <div className="w-full p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
