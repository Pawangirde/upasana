import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import {
  BsCheckCircle,
  BsClock,
  BsBook,
  BsCalendar,
  BsAward,
  BsArrowRight,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

// Helper: Get the date of the first Thursday from a given start date
function getFirstThursday(startDate) {
  const date = new Date(startDate);
  const day = date.getDay();
  // 4 = Thursday
  const diff = (4 - day + 7) % 7;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

// Helper: Get the current week number since the first Thursday
function getCurrentWeekNumber(firstThursday) {
  const now = new Date();
  const diff = now - firstThursday;
  if (diff < 0) return 0;
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
}

// Helper: Is today Thursday or later in the week?
function isThursdayOrLater() {
  const today = new Date().getDay();
  // 4 = Thursday, 5 = Friday, 6 = Saturday, 0 = Sunday
  return today === 4 || today === 5 || today === 6 || today === 0;
}

export default function Tasks({ darkMode }) {
  const { t } = useLanguage();

  // --- CONFIG ---
  const TOTAL_ADHYAYAS = 21;
  const TOTAL_USERS = 21;
  const USER_ID = 0; // For demo, assume user 0 (in real app, use logged-in user index)
  const GROUP_START_DATE = "2024-06-06"; // Set the first Thursday (YYYY-MM-DD)

  // --- WEEK & ROTATION LOGIC ---
  const firstThursday = getFirstThursday(GROUP_START_DATE);
  const currentWeek = getCurrentWeekNumber(firstThursday);

  // Each user gets a different Adhyaya each week in a round-robin
  const getAdhyayaForUser = (userId, week) => ((userId + week) % TOTAL_ADHYAYAS) + 1;

  // --- STATE ---
  const [completedAdhyayas, setCompletedAdhyayas] = useState([]); // e.g. [1,2]
  const [showNextOnThursday, setShowNextOnThursday] = useState(false);
  const [lastCompletedWeek, setLastCompletedWeek] = useState(null);

  // Current Adhyaya for this user and week
  const currentAdhyaya = getAdhyayaForUser(USER_ID, currentWeek);
  const currentDate = new Date().toLocaleDateString("hi-IN");

  // Weekdays (Hindi)
  const weekDays = [
    "सोमवार",
    "मंगलवार",
    "बुधवार",
    "गुरुवार",
    "शुक्रवार",
    "शनिवार",
    "रविवार",
  ];
  const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  // --- HANDLERS ---
  const handleMarkComplete = () => {
    // Only allow completion if not already completed for this week
    if (completedAdhyayas.includes(currentAdhyaya)) return;
    // Only allow assignment of next Adhyaya if Thursday or later
    if (isThursdayOrLater()) {
      setCompletedAdhyayas([...completedAdhyayas, currentAdhyaya]);
      setLastCompletedWeek(currentWeek);
      setShowNextOnThursday(false);
    } else {
      setShowNextOnThursday(true);
    }
  };

  // --- TRANSLATION SAFETY ---
  const safeTranslate = (key) => {
    try {
      return t(key) || key;
    } catch (error) {
      console.error("Translation error for key:", key, error);
      return key;
    }
  };

  // --- UI ---
  return (
    <Container className="py-4 mt-4">
      {/* Today's Assignment Card */}
      <Card className={`mb-4 border-0 shadow mt-4 ${darkMode ? "bg-dark text-white" : ""}`}>
        <Card.Body className="text-center">
          <div className="w-20 h-20 bg-opacity-10  d-flex align-items-center justify-content-center mx-auto mb-4">
            <BsBook size={32} className="text-primary" />
          </div>
          <h1 className={`h2 fw-bold mb-2 ${darkMode ? "text-white" : "text-dark"}`}>{safeTranslate("todays_assignment")}</h1>
          <p className="text-muted">
            {currentDate} - {weekDays[currentDayIndex]}
          </p>
        </Card.Body>
      </Card>

      {/* Assignment Details */}
      <Card className={`mb-4 border-0 shadow ${darkMode ? "bg-dark text-white" : ""}`}>
        <Card.Body className="p-4">
          <div className={`rounded-3 p-4 mb-4 ${darkMode ? "bg-dark bg-opacity-50" : "bg-light"}`}>
            <div className="text-center">
              <h2 className={`h4 fw-bold mb-2 ${darkMode ? "text-white" : "text-primary"}`}>
                {safeTranslate("adhyaya")} {currentAdhyaya}
              </h2>
              <p className={`mb-4 ${darkMode ? "text-white-50" : "text-primary"}`}>{safeTranslate("gajanan_vijay_gatha")}</p>
              <div className="d-flex align-items-center justify-content-center gap-4 text-sm text-muted mb-4">
                <div className="d-flex align-items-center">
                  <BsClock size={16} className="me-1" />
                  {safeTranslate("estimated_time")}: 15-20 {safeTranslate("minutes")}
                </div>
                <div className="d-flex align-items-center">
                  <BsCalendar size={16} className="me-1" />
                  {safeTranslate("week")}: {currentWeek + 1} / 21
                </div>
              </div>

              {/* Completion Logic */}
              {completedAdhyayas.includes(currentAdhyaya) ? (
                <div className="text-center">
                  <BsCheckCircle size={48} className="text-success mx-auto mb-3" />
                  <p className="text-success fw-semibold fs-5">{safeTranslate("completed")} 🎉</p>
                  <p className="text-muted small">{safeTranslate("next_adhyaya_on_thursday")}</p>
                </div>
              ) : showNextOnThursday ? (
                <Alert variant="info" className="mt-3">
                  {safeTranslate("next_adhyaya_assign_thursday")}
                </Alert>
              ) : (
                <Button variant="primary" size="lg" onClick={handleMarkComplete} className="px-4 py-2">
                  {safeTranslate("complete_adhyaya")}
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Week Progress */}
      <Card className={`mb-4 border-0 shadow ${darkMode ? "bg-dark text-white" : ""}`}>
        <Card.Body>
          <h2 className={`h4 fw-bold mb-4 ${darkMode ? "text-white" : "text-dark"}`}>{safeTranslate("week_progress")}</h2>
          <Row className="mb-4">
            {[...Array(TOTAL_ADHYAYAS)].map((_, index) => (
              <Col key={index} className="mb-2 rounded p-4">
                <div className={`text-center rounded border-2 week-progress-card ${
                  completedAdhyayas.includes(index + 1)
                    ? 'border-success bg-success bg-opacity-10'
                    : (index + 1) === currentAdhyaya
                    ? 'border-primary bg-primary bg-opacity-10'
                    : darkMode ? 'border-secondary bg-dark' : 'border-light bg-light'
                }`}>
                  <div className={`w-8 h-8 mx-auto mb-2 rounded d-flex align-items-center justify-content-center ${
                    completedAdhyayas.includes(index + 1)
                      ? 'bg-success text-white'
                      : (index + 1) === currentAdhyaya
                      ? 'bg-primary text-white'
                      : darkMode ? 'bg-secondary text-white' : 'bg-light text-muted'
                  }`}>
                    {completedAdhyayas.includes(index + 1) ? (
                      <BsCheckCircle size={16} />
                    ) : (
                      <span className="small fw-bold">{index + 1}</span>
                    )}
                  </div>
                  <p className="small fw-medium text-muted">{safeTranslate("adhyaya")} {index + 1}</p>
                </div>
              </Col>
            ))}
          </Row>
          <div className={`rounded p-3 ${darkMode ? "bg-dark bg-opacity-50" : "bg-light"}`}>
            <div className="d-flex justify-content-between text-muted small mb-2">
              <span>{safeTranslate("adhyayas_completed")}</span>
              <span>
                {completedAdhyayas.length}/21 {safeTranslate("adhyayas")}
              </span>
            </div>
            <ProgressBar
              now={(completedAdhyayas.length / TOTAL_ADHYAYAS) * 100}
              variant="success"
              className="mb-0 progress-bar-animated"
            />
          </div>
        </Card.Body>
      </Card>

      {/* Team Status */}
      <Card
        className={`mb-4 border-0 shadow ${
          darkMode ? "bg-dark text-white" : ""
        }`}
      >
        <Card.Body>
          <h2
            className={`h4 fw-bold mb-4 ${
              darkMode ? "text-white" : "text-dark"
            }`}
          >
            {safeTranslate("team_status")}
          </h2>

          <Row>
            <Col xs={6} md={3} className="mb-3">
              <div className={`text-center p-3 rounded team-status-card ${darkMode ? 'bg-success bg-opacity-20' : 'bg-success bg-opacity-10'}`}>
                <BsCheckCircle size={24} className="text-success mx-auto mb-2" />
                <p className="h5 fw-bold text-success mb-1">12</p>
                <p className="small text-muted">{safeTranslate("completed_today")}</p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <div className={`text-center p-3 rounded team-status-card ${darkMode ? 'bg-warning bg-opacity-20' : 'bg-warning bg-opacity-10'}`}>
                <BsClock size={24} className="text-warning mx-auto mb-2" />
                <p className="h5 fw-bold text-warning mb-1">9</p>
                <p className="small text-muted">{safeTranslate("remaining")}</p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <div className={`text-center p-3 rounded team-status-card ${darkMode ? 'bg-info bg-opacity-20' : 'bg-info bg-opacity-10'}`}>
                <BsAward size={24} className="text-info mx-auto mb-2" />
                <p className="h5 fw-bold text-info mb-1">21</p>
                <p className="small text-muted">{safeTranslate("total_members")}</p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <div className={`text-center p-3 rounded team-status-card ${darkMode ? 'bg-primary bg-opacity-20' : 'bg-primary bg-opacity-10'}`}>
                <BsBook size={24} className="text-primary mx-auto mb-2" />
                <p className="h5 fw-bold text-primary mb-1">21</p>
                <p className="small text-muted">{safeTranslate("adhyaya")}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Quick Actions */}
      <Row>
        <Col sm={6} className="mb-3">
          <Link to="/library" className="text-decoration-none">
            <Card
              className={`h-100 border-0 shadow hover-shadow-lg transition-all ${
                darkMode ? "bg-dark text-white" : ""
              }`}
            >
              <Card.Body className="text-center p-4">
                <BsBook size={32} className="text-primary mx-auto mb-3" />
                <h3 className="fw-semibold mb-2">{safeTranslate("read_esahitya")}</h3>
                <p className="small text-muted">{safeTranslate("aarti_bavani_content")}</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col sm={6} className="mb-3">
          <Link to="/upasana" className="text-decoration-none">
            <Card
              className={`h-100 border-0 shadow hover-shadow-lg transition-all ${
                darkMode ? "bg-dark text-white" : ""
              }`}
            >
              <Card.Body className="text-center p-4">
                <BsAward size={32} className="text-primary mx-auto mb-3" />
                <h3 className="fw-semibold mb-2">{safeTranslate("view_team")}</h3>
                <p className="small text-muted">{safeTranslate("view_team_progress")}</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
