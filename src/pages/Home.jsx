import { FaVolumeUp, FaCalendarAlt, FaUsers, FaPray } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Library from "./Library";
// import About from "./About";
export default function HomePage({ toggleTheme, darkMode }) {
  const itemClass = darkMode
    ? "bg-dark text-white border-secondary"
    : "bg-white text-dark";

  return (
    <div className={`container py-5 ${darkMode ? "bg-dark" : "bg-light"}`}>
      {/* Upasana Card */}
      <Card className={`upasana-card position-relative border-0 shadow-lg mb-5`}>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1622279486466-e0e3bfdd0a01?w=1200&auto=format&fit=crop&q=80"
          alt="Current Upasana"
          className="upasana-image"
        />
        <div className="live-badge bg-danger text-white px-3 py-1 rounded-pill position-absolute top-3 start-3">
          LIVE
        </div>
        <div className="text-overlay shadow-lg p-4">
          <h2 className="upasana-title text-white fw-bold">Current Upāsanā</h2>
          <p className="upasana-subtitle text-light fs-5">Akhanda Parayan Saptah - Day 3</p>
        </div>
      </Card>

      {/* Quick Access */}
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary mb-3">Quick Access</h3>
        <Row className="g-3 justify-content-center">
          {["On Going", "Upcoming", "Completed"].map((label, index) => (
            <Col key={index} xs={12} md={4}>
              <Card className={`h-100 border-0 shadow ${itemClass}`}>
                <Card.Img
                  variant="top"
                  src="https://santgajananbhaktparivar.com/public/img/brand/home.jpeg"
                  className="rounded-top"
                />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold">{label}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Global Mantra Count */}
      <div className="mt-5">
        <h3 className="fw-bold text-primary mb-3">Global Mantra Count</h3>
        <Card className={`p-4 d-flex flex-row justify-content-between align-items-center shadow ${itemClass}`}>
          <div>
            <span className="d-block text-muted">Total Mantras Chanted</span>
            <span className="fs-2 fw-bold text-success">1,234,567,890</span>
          </div>
          <FaVolumeUp className="fs-1 text-warning" />
        </Card>
      </div>

      {/* Devotional Statistics */}
      <div className="mt-5">
        <h3 className="fw-bold text-primary mb-3">Devotional Statistics</h3>
        <Row className="g-3">
          <Col xs={6}>
            <Card className={`text-center p-3 shadow ${itemClass}`}>
              <FaUsers className="fs-1 text-primary mb-2" />
              <p className="fw-bold mb-1 text-muted">Total Followers</p>
              <p className="fs-4 fw-bold">187,456</p>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className={`text-center p-3 shadow ${itemClass}`}>
              <FaPray className="fs-1 text-success mb-2" />
              <p className="fw-bold mb-1 text-muted">Total Upāsanās</p>
              <p className="fs-4 fw-bold">789,819</p>
            </Card>
          </Col>
        </Row>
      </div>

      {/* New Upcoming Events Section */}
      <div className="mt-5">
        <h3 className="fw-bold text-primary mb-3">Upcoming Events</h3>
        <Row className="g-3">
          {[1, 2, 3].map((_, i) => (
            <Col xs={12} md={4} key={i}>
              <Card className={`border-0 shadow ${itemClass}`}>
                <Card.Body>
                  <FaCalendarAlt className="fs-2 text-danger mb-2" />
                  <Card.Title>Event {i + 1}</Card.Title>
                  <Card.Text>
                    Join us for the spiritual event happening on{" "}
                    <strong>10th August</strong>.
                  </Card.Text>
                  <button className="btn btn-outline-primary btn-sm">Learn More</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Library />
    </div>
  );
}
