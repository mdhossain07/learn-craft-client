import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { PuffLoader } from "react-spinners";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return <PuffLoader color="#36d7b7" />;
  }

  if (user && isAdmin.admin === true) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
