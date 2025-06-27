// src/components/Navbar.js
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";
import TopNavbar from "./TopNav";

export default function Navbar() {
  return (
    <>
      <TopNavbar />
      <nav className="navbar navbar-expand-sm custom-navbar fixed-bottom">
        <div className="container-fluid justify-content-around">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-link text-white d-flex flex-column align-items-center ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaHome size={24} />
            <span className="nav-label">Home</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link text-white d-flex flex-column align-items-center ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaInfoCircle size={24} />
            <span className="nav-label">About</span>
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `nav-link text-white d-flex flex-column align-items-center ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaServicestack size={24} />
            <span className="nav-label">Services</span>
          </NavLink>

          <NavLink
            to="/upasana"
            className={({ isActive }) =>
              `nav-link text-white d-flex flex-column align-items-center ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaEnvelope size={24} />
            <span className="nav-label">Upasana</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link text-white d-flex flex-column align-items-center ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaCog size={24} />
            <span className="nav-label">Settings</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
