import { Link } from "react-router-dom"
import '../css/home.css'


const Navbar = () => {
  return (
    <>
      <nav className="w-full hidden md:block border-b border-border bg-white sticky top-0 z-50">
        <div className="navbar flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
          <Link to="/" className="navbar-left flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
            <span className="capitalize text-2xl font-bold">gainz journal</span>
          </Link>
          <div className="navbar-right flex items-center gap-4">
            <Link to="/" className="text-sm font-medium link-item py-1 ">Home</Link>
            <Link to="/workouts" className="text-sm font-medium link-item py-1 ">Workouts</Link>
            <Link to="/profile" className="text-sm font-medium link-item py-1 ">Profile</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar