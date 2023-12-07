import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (user) {
    return children;
  }

  if (loading) {
    return <h2>Loading....</h2>;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
