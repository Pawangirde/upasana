import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  ProgressBar,
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

export default function Tasks({ darkMode }) {
  const { t } = useLanguage();
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log("Tasks component mounted");
    console.log("Dark mode:", darkMode);
    console.log("Translation function:", t);
  }, [darkMode, t]);

  // Mock data
  const currentUser = {
    adhyaya: 15,
    day: 3,
  };

  const currentUpasana = {
    completedToday: 18,
    teamSize: 21,
  };

  const currentDate = new Date().toLocaleDateString("hi-IN");

  const weekDays = [
    "सोमवार",
    "मंगलवार",
    "बुधवार",
    "गुरुवार",
    "शुक्रवार",
    "शनिवार",
    "रविवार",
  ];
  const currentDayIndex =
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Adjust for Monday start

  const weekProgress = weekDays.map((day, index) => ({
    day,
    isCompleted:
      index < currentDayIndex || (index === currentDayIndex && isCompleted),
    isCurrent: index === currentDayIndex,
    adhyaya: currentUser.adhyaya,
  }));

  const handleMarkComplete = () => {
    setIsCompleted(true);
    setCompletionTime(new Date().toLocaleTimeString("hi-IN"));
  };

  // Error boundary - if translation fails, show fallback
  const safeTranslate = (key) => {
    try {
      return t(key) || key;
    } catch (error) {
      console.error("Translation error for key:", key, error);
      return key;
    }
  };

  return (
    <Container className="py-4 mt-4">
      {/* Today's Assignment Card */}
      <Card
        className={`mb-4 border-0 shadow mt-4 ${
          darkMode ? "bg-dark text-white" : ""
        }`}
      >
        <Card.Body className="text-center">
          <div className="w-20 h-20 bg-opacity-10  d-flex align-items-center justify-content-center mx-auto mb-4">
            <BsBook size={32} className="text-primary" />
          </div>
          <h1
            className={`h2 fw-bold mb-2 ${
              darkMode ? "text-white" : "text-dark"
            }`}
          >
            {safeTranslate("todays_assignment")}
          </h1>
          <p className="text-muted">
            {currentDate} - {weekDays[currentDayIndex]}
          </p>
        </Card.Body>
      </Card>

      {/* Assignment Details */}
      <Card
        className={`mb-4 border-0 shadow ${
          darkMode ? "bg-dark text-white" : ""
        }`}
      >
        <Card.Body className="p-4">
          <div
            className={`rounded-3 p-4 mb-4 ${
              darkMode ? "bg-dark bg-opacity-50" : "bg-light"
            }`}
          >
            <div className="text-center">
              <h2
                className={`h4 fw-bold mb-2 ${
                  darkMode ? "text-white" : "text-primary"
                }`}
              >
                {safeTranslate("adhyaya")} {currentUser.adhyaya}
              </h2>
              <p
                className={`mb-4 ${
                  darkMode ? "text-white-50" : "text-primary"
                }`}
              >
                {safeTranslate("gajanan_vijay_gatha")}
              </p>

              <div className="d-flex align-items-center justify-content-center gap-4 text-sm text-muted mb-4">
                <div className="d-flex align-items-center">
                  <BsClock size={16} className="me-1" />
                  {safeTranslate("estimated_time")}: 15-20 {safeTranslate("minutes")}
                </div>
                <div className="d-flex align-items-center">
                  <BsCalendar size={16} className="me-1" />
                  {safeTranslate("day")} {currentUser.day}
                </div>
              </div>

              {!isCompleted ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleMarkComplete}
                  className="px-4 py-2"
                >
                  {safeTranslate("complete_adhyaya")}
                </Button>
              ) : (
                <div className="text-center">
                  <BsCheckCircle
                    size={48}
                    className="text-success mx-auto mb-3"
                  />
                  <p className="text-success fw-semibold fs-5">
                    {safeTranslate("completed")} 🎉
                  </p>
                  <p className="text-muted small">
                    {safeTranslate("completion_time")}: {completionTime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Week Progress */}
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
            {safeTranslate("week_progress")}
          </h2>

          <Row className="mb-4">
            {weekProgress.map((day, index) => (
              <Col key={index} className="mb-2 rounded p-4">
                <div className={`text-center rounded border-2 week-progress-card ${
                  day.isCurrent 
                    ? 'border-primary bg-primary bg-opacity-10' 
                    : day.isCompleted 
                    ? 'border-success bg-success bg-opacity-10' 
                    : darkMode ? 'border-secondary bg-dark' : 'border-light bg-light'
                }`}>
                  <div className={`w-8 h-8 mx-auto mb-2 rounded d-flex align-items-center justify-content-center ${
                    day.isCompleted 
                      ? 'bg-success text-white' 
                      : day.isCurrent 
                      ? 'bg-primary text-white' 
                      : darkMode ? 'bg-secondary text-white' : 'bg-light text-muted'
                  }`}>
                    {day.isCompleted ? (
                      <BsCheckCircle size={16} />
                    ) : (
                      <span className="small fw-bold">{index + 1}</span>
                    )}
                  </div>
                  <p className="small fw-medium text-muted">{day.day}</p>
                </div>
              </Col>
            ))}
          </Row>

          <div
            className={`rounded p-3 ${
              darkMode ? "bg-dark bg-opacity-50" : "bg-light"
            }`}
          >
            <div className="d-flex justify-content-between text-muted small mb-2">
              <span>{safeTranslate("week_progress")}</span>
              <span>
                {weekProgress.filter((d) => d.isCompleted).length}/7 {safeTranslate("days")}
              </span>
            </div>
            <ProgressBar 
              now={(weekProgress.filter(d => d.isCompleted).length / 7) * 100} 
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
                <p className="h5 fw-bold text-success mb-1">{currentUpasana.completedToday}</p>
                <p className="small text-muted">{safeTranslate("completed_today")}</p>
              </div>
            </Col>
            
            <Col xs={6} md={3} className="mb-3">
              <div className={`text-center p-3 rounded team-status-card ${darkMode ? 'bg-warning bg-opacity-20' : 'bg-warning bg-opacity-10'}`}>
                <BsClock size={24} className="text-warning mx-auto mb-2" />
                <p className="h5 fw-bold text-warning mb-1">{currentUpasana.teamSize - currentUpasana.completedToday}</p>
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
