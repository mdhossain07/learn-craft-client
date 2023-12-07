import { Link, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-gray-200 p-2">
        <Link to="/admin/users">
          <h2>Users</h2>
        </Link>

        <Link to="/admin/teacher-request">
          <h2>Teacher Request</h2>
        </Link>

        <Link to="/admin/all-classes">
          <h2>All Classes</h2>
        </Link>
      </div>

      <div className="w-full p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
