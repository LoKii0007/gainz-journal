import { Link, useLocation } from "react-router-dom";
import "../css/home.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = useLocation().pathname;
  const [activeLink, setActiveLink] = useState<string>(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <>
      <nav className="w-full hidden md:block border-b border-border bg-white sticky top-0 z-50">
        <div className="navbar flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
          <Link to="/dashboard" className="navbar-left flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
            <span className="capitalize text-2xl font-bold">gainz journal</span>
          </Link>
          <div className="navbar-right flex items-center gap-4">
            <Link
              to="/dashboard"
              onClick={() => setActiveLink("/dashboard")}
              className={`text-sm font-medium link-item py-1 ${
                activeLink === "/dashboard" ? "text-blue-500" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/workouts"
              onClick={() => setActiveLink("/workouts")}
              className={`text-sm font-medium link-item py-1 ${
                activeLink === "/workouts" ? "text-blue-500" : ""
              }`}
            >
              Workouts
            </Link>
            <Link
              to="/profile"
              onClick={() => setActiveLink("/profile")}
              className={`text-sm font-medium link-item py-1 ${
                activeLink === "/profile" ? "text-blue-500" : ""
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
