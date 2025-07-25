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
  const bottomNavItems = [
    { to: "/home", label: "Home", icon: FaHome, color: "#f97316" },
    { to: "/about", label: "About", icon: FaInfoCircle, color: "#3b82f6" },
    { to: "/services", label: "Services", icon: FaServicestack, color: "#22c55e" },
    { to: "/upasana", label: "Upasana", icon: FaEnvelope, color: "#eab308" },
    { to: "/settings", label: "Settings", icon: FaCog, color: "#8b5cf6" },
  ];

  return (
    <>
      <TopNavbar />
      <nav className="navbar navbar-expand-sm fixed-bottom custom-navbar shadow-lg border-top">
        <div className="container-fluid justify-content-around">
          {bottomNavItems.map(({ to, label, icon: Icon, color }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link d-flex flex-column align-items-center px-2 py-1 ${
                  isActive ? "active" : "text-muted"
                }`
              }
              style={({ isActive }) => ({
                transition: "all 0.3s ease",
                borderRadius: "12px",
                background: isActive ? `${color}20` : "transparent",
                color: isActive ? color : "#6c757d",
              })}
            >
              <Icon size={22} style={{ color: "inherit", transition: "0.3s" }} />
              <span className="nav-label small mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
