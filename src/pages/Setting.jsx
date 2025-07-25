import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBell,FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageLayout from "../PageLayout";
export default function Setting({ toggleTheme, darkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Define class based on theme
  const itemClass = darkMode
    ? "list-group-item bg-dark text-white border-secondary"
    : "list-group-item";

  return (
    <PageLayout>
      <div className={`container py-4 ${darkMode ? "bg-dark text-white" : ""}`}>
        <h2 className="text-primary mb-4">Settings</h2>

        <ul className="list-group">
          <li className={`d-flex align-items-center ${itemClass}`}>
            <FaUser className="me-3 text-secondary" />
            <Link to="/profile" className="text-decoration-none text-secondary">
              <span>Profile</span>
            </Link>
          </li>
          <li className={`d-flex align-items-center ${itemClass}`}>
            <FaBell className="me-3 text-secondary" />
            <span>Notifications</span>
          </li>
          {/* <li
            className={`d-flex align-items-center ${itemClass}`}
            style={{ cursor: "pointer" }}
            onClick={toggleTheme}
          >
            {darkMode ? (
              <>
                <FaSun className="me-3 text-warning" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <FaMoon className="me-3 text-dark" />
                <span>Dark Mode</span>
              </>
            )}
          </li> */}
          <li
            className={`d-flex align-items-center text-danger ${itemClass}`}
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-3" />
            <strong>Logout</strong>
          </li>
        </ul>
      </div>
    </PageLayout>
  );
}
