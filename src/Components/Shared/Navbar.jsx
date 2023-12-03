import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaAlignJustify } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    logOut().then(() => {
      toast.success("User Logged Out!");
      navigate("/");
    });
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
        Teach on LEARN CRAFT
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="flex justify-around items-center relative py-4 md:py-6 ">
        <div className="">
          <Link to="/">
            <h2 className="text-3xl font-semibold ml-16 lg:ml-2">
              Learn Craft
            </h2>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex gap-5">{navItems}</div>
        </div>

        {user?.email ? (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 42, height: 42 }}>
                  <img src={user?.photoURL} alt="" />
                </Avatar>
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <Link to="/teacher/add-class">
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
              </Link>
              <MenuItem onClick={handleSignOut}>LogOut</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-[#0C356A]  px-5 py-3 rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>

      <div className="md:hidden absolute top-8 ml-10">
        {isOpen ? (
          <div onClick={toggleNav}>
            <FaTimes className="text-2xl cursor-pointer" />
          </div>
        ) : (
          <div onClick={toggleNav}>
            <FaAlignJustify className="text-2xl cursor-pointer" />
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
