import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Inicio</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/login">Login</Link>
  </nav>
);

export default Navbar;
