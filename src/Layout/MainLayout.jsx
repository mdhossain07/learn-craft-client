import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="bg-[#0766AD] sticky top-0 z-[50] text-white shadow-lg">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
