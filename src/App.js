// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import PageLayout from "./PageLayout";
import Settings from "./pages/Setting";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Upasana from "./pages/Upasana";
import Gallary from "./pages/Gallary";
import Tasks from "./pages/Tasks";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = darkMode
      ? "bg-dark text-white"
      : "bg-light text-dark";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <LanguageProvider>
      <div
        className={
          darkMode
            ? "bg-dark text-white min-vh-100"
            : "bg-light text-dark min-vh-100"
        }
      >
        <Router>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Home
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <About
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/services"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Services
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/upasana"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Upasana
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/tasks"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Tasks
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/library"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Library
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Settings
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/gallery"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Gallary
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Navbar />
                  <div style={{ paddingBottom: "70px" }}>
                    <Profile
                      toggleTheme={() => setDarkMode(!darkMode)}
                      darkMode={darkMode}
                    />
                  </div>
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </LanguageProvider>
  );
}

export default App;
