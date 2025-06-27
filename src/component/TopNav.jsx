// src/components/TopNavbar.js
import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  ListGroup,
  Button,
} from "react-bootstrap";
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
    { path: "/home", label: t("home"), icon: BsHouseDoorFill },
    { path: "/upasana", label: t("join_upasana"), icon: BsCalendar },
    { path: "/tasks", label: t("daily_tasks"), icon: BsCheck2Square },
    { path: "/library", label: t("library"), icon: BsBook },
    { path: "/settings", label: t("notifications"), icon: BsBell },
    { path: "/gallery", label: t("gallery"), icon: BsImage },
    { path: "/profile", label: t("profile"), icon: BsPerson },
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
        // style={{ width: "300px" }}
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
          {/* Navigation */}
          <ListGroup variant="flush" className="mb-4">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <ListGroup.Item
                  key={path}
                  action
                  onClick={() => {
                    navigate(path);
                    setShowSidebar(false);
                  }}
                  className={`d-flex align-items-center rounded gap-2 mb-1 ${
                    isActive ? "active" : ""
                  } custom-list-item`}
                >
                  <Icon size={18} className="me-2" />
                  {label}
                </ListGroup.Item>
              );
            })}
          </ListGroup>

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
