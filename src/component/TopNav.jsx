// src/components/TopNavbar.js
import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { FaUserCircle, FaBars } from "react-icons/fa";
import {
  BsHouseDoorFill,
  BsBook,
  BsCheck2Square,
  BsImage,
  BsPerson,
  BsBell,
  BsCalendar,
  BsGlobe,
  BsChevronRight,
} from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);

  const navItems = [
    {
      path: "/home",
      label: t("home"),
      icon: BsHouseDoorFill,
      color: "#f97316",
    },
    {
      path: "/upasana",
      label: t("join_upasana"),
      icon: BsCalendar,
      color: "#22c55e",
    },
    {
      path: "/tasks",
      label: t("daily_tasks"),
      icon: BsCheck2Square,
      color: "#3b82f6",
    },
    { path: "/library", label: t("library"), icon: BsBook, color: "#eab308" },
    {
      path: "/settings",
      label: t("notifications"),
      icon: BsBell,
      color: "#ec4899",
    },
    { path: "/gallery", label: t("gallery"), icon: BsImage, color: "#06b6d4" },
    { path: "/profile", label: t("profile"), icon: BsPerson, color: "#8b5cf6" },
  ];

  const languages = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "English" },
  ];

  const handleLanguageChange = (code) => setLanguage(code);

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" className="shadow-sm fixed-top">
        <Container className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-secondary me-2 d-flex align-items-center"
            onClick={handleToggleSidebar}
          >
            <FaBars />
          </button>

          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              src="https://media.istockphoto.com/id/1816679535/photo/gajanan-maharaj-idol-of-hindu-saint-gajananmaharaj-shegaon.jpg?s=1024x1024&w=is&k=20&c=IVVzUGu9mP4-T3yC-HEtVs_lCXLbVRY_VcwpBGBLxcs="
              alt="Upasana"
              width="36"
              height="36"
              className="me-2 rounded-circle"
            />
            <span className="fw-bold fs-5">UPASANA</span>
          </Navbar.Brand>

          <Nav>
            <Nav.Link onClick={() => navigate("/settings")}>
              <FaUserCircle size={28} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas
        show={showSidebar}
        onHide={handleToggleSidebar}
        placement="start"
      >
        <Offcanvas.Header
          closeButton
          style={{
            background: "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="bg-light rounded-circle d-flex justify-content-center align-items-center me-2"
              style={{ width: 40, height: 40 }}
            >
              <span role="img" aria-label="om" style={{ fontSize: 20 }}>
                🕉️
              </span>
            </div>
            <div>
              <h5 className="mb-0">उपासना ऐप</h5>
              <small className="text-muted">{t("gajanan_maharaj_kripa")}</small>
            </div>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {/* Modern Navigation */}
          <div className="mb-4">
            <div className="d-grid gap-2">
              {navItems.map(({ path, label, icon: Icon, color }) => {
                const isActive = location.pathname === path;
                return (
                  <button
                    key={path}
                    className="btn text-start d-flex align-items-center justify-content-between p-3 border-0"
                    onClick={() => {
                      navigate(path);
                      setShowSidebar(false);
                    }}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${color}20, ${color}10)`
                        : "transparent",
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      border: isActive
                        ? `1px solid ${color}30`
                        : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          "rgba(0, 0, 0, 0.05)";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "translateX(0)";
                      }
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          background: isActive ? color : `${color}20`,
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Icon
                          size={18}
                          className={isActive ? "text-white" : ""}
                          style={{ color: isActive ? "white" : color }}
                        />
                      </div>
                      <span
                        className={`fw-semibold ${
                          isActive ? "text-dark" : "text-muted"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    <BsChevronRight
                      size={14}
                      className={isActive ? "text-dark" : "text-muted"}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <BsGlobe size={18} className="me-2 text-secondary" />
              <strong>{t("language")}</strong>
            </div>
            <div className="d-grid gap-2">
              {languages.map(({ code, label }) => (
                <Button
                  key={code}
                  variant={
                    currentLanguage === code ? "primary" : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => handleLanguageChange(code)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4 text-muted">
            <small>गणपती बाप्पा मोरया! 🙏</small>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
