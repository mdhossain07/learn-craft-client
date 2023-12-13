import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PuffLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (user) {
    return children;
  }

  if (loading) {
    return <PuffLoader color="#36d7b7" />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
