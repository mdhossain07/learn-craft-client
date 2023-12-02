import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaTimes, FaAlignJustify } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = (
    <>
      <NavLink
        style={{
          fontWeight: "600",
          //   color: "white",
          hover: { color: "#F4F27E" },
        }}
        className={({ isActive }) => (isActive ? "text-[#F4F27E]" : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={{
          fontWeight: "600",
          //   color: "white",
          hover: { color: "#F4F27E" },
        }}
        className={({ isActive }) => (isActive ? "text-[#F4F27E]" : "")}
        to="/all-classes"
      >
        All Classes
      </NavLink>
      <NavLink
        style={{
          fontWeight: "600",
          //   color: "white",
          hover: { color: "#F4F27E" },
        }}
        className={({ isActive }) => (isActive ? "text-[#F4F27E]" : "")}
        to="/teach"
      >
        Teach on Learn Craft
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="flex justify-around items-center relative py-4 md:py-6 ">
        <div className="">
          <Link to="/">
            <h2 className="text-3xl font-semibold">Learn Craft</h2>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex gap-5">{navItems}</div>
        </div>

        <Link to="/login">
          <button className="bg-[#0C356A]  px-5 py-3 rounded-full">
            Login
          </button>
        </Link>

        {/* {user && user?.email ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul className="mt-4 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-black">
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>

              <div onClick={handleSignOut}>
                <li>
                  <Link>Logout</Link>
                </li>
              </div>
            </ul>
          </div>
        ) : (
         
        )} */}
      </div>

      <div className="md:hidden absolute top-8 ml-5">
        {isOpen ? (
          <div onClick={toggleNav}>
            <FaTimes className="text-2xl cursor-pointer ml-5" />
          </div>
        ) : (
          <div onClick={toggleNav}>
            <FaAlignJustify className="text-2xl cursor-pointer ml-5" />
          </div>
        )}
      </div>

      <div className="">
        {isOpen && (
          <div className="flex flex-col gap-5 py-5 px-10  md:hidden ">
            {navItems}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
