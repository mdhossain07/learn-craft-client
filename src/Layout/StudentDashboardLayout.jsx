import { FaHouse, FaUser } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { FaReadme } from "react-icons/fa";

import { Link, Outlet } from "react-router-dom";

const StudentDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 lg:w-1/4 bg-[#0766AD] text-white p-3 flex flex-col justify-between">
        <div>
          <Link to="/student/profile">
            <div className="flex gap-2 items-center my-3">
              <FaUser className="text-xl" />
              <h2 className="font-medium text-xl">Student Profile</h2>
            </div>
          </Link>
          <Link to="/student/enroll-class">
            <div className="flex gap-2 items-center my-3">
              <FaBookOpen className="text-xl" />
              <h2 className="font-medium text-xl">Enroll Classes</h2>
            </div>
          </Link>
        </div>

        <div className="py-3">
          <hr />
          <Link to="/">
            <div className="flex gap-2 items-center mt-5">
              <FaHouse className="text-xl" />
              <h2 className="font-medium text-xl">Home</h2>
            </div>
          </Link>
          <Link to="/all-classes">
            <div className="flex gap-2 items-center my-5">
              <FaReadme className="text-xl" />
              <h2 className="font-medium text-xl">All Classes</h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
