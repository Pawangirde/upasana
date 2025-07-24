import {  FaVolumeUp } from "react-icons/fa";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function HomePage({ toggleTheme, darkMode }) {
  const itemClass = darkMode
    ? 'list-group-item bg-dark text-white border-secondary'
    : 'list-group-item';

  return (
    <div className={`container p-4 mt-4 ${itemClass}`}>
      {/* Upasana Card */}
      <Card
        className={`upasana-card position-relative overflow-hidden ${itemClass} mt-4`}
      >
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1622279486466-e0e3bfdd0a01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhpbmR1JTIwZ29kfGVufDB8fDB8fHww"
          alt="Current Upasana"
          className="upasana-image"
        />
        <div className="live-badge">LIVE</div>
        <div className="text-overlay shadow-lg">
          <h2 className="upasana-title">Current Upāsanā</h2>
          <p className="upasana-subtitle">Akhanda Parayan Saptah - Day 3</p>
        </div>
      </Card>

      {/* Quick Access */}
      <div className="text-center mt-4">
        <h3 className="common-heading">Quick Access</h3>
      </div>

      <Row className="gap-2 mt-2 justify-content-center">
        {["On Going", "Upcoming", "Completed"].map((label, index) => (
          <Col
            key={index}
            className={`text-center p-2 rounded shadow ${itemClass}`}
          >
            <img
              src="https://santgajananbhaktparivar.com/public/img/brand/home.jpeg"
              alt={label}
              className="w-100 h-75 rounded"
            />
            <div className="mt-4">
              <span className="fw-bold">{label}</span>
            </div>
          </Col>
        ))}
      </Row>

      {/* Global Mantra Count */}
      <div className="mt-4">
        <h3
          className={`common-heading`}
        >
          Global Mantra Count
        </h3>

        <div
          className={`global-mantra-card global-mantra-card d-flex justify-content-between align-items-center p-3 rounded shadow ${itemClass}`}
        >
          <div>
            <span className="mantra-text-block text-muted">
              Total Mantras Chanted
            </span>
            <span className="mantra-count">1,234,567,890</span>
          </div>
          <FaVolumeUp className="fs-3 text-warning" />
        </div>
      </div>

      {/* Devotional Statistics */}
      <h3 className={`common-heading mt-4`}>
        Devotional Statistics
      </h3>
      <div className="row mt-2">
        <div className="col-6">
          <div className={`rounded shadow text-center p-3 ${itemClass}`}>
            <p className="text-sm fw-bold text-muted mb-1">Total Followers</p>
            <p className="fs-4 fw-bold">187,456</p>
          </div>
        </div>
        <div className="col-6">
          <div className={`rounded shadow text-center p-3 ${itemClass}`}>
            <p className="text-sm fw-bold text-muted mb-1">Total Upāsanās</p>
            <p className="fs-4 fw-bold">789,819</p>
          </div>
        </div>
      </div>
    </div>
  );
}
