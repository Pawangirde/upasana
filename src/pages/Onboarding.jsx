// src/pages/Onboarding.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BsArrowRight, BsHeart, BsBook, BsPeople, BsAward } from 'react-icons/bs';
import { FaOm, FaPrayingHands } from 'react-icons/fa';
// import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <FaOm size={60} className="text-primary" />,
      title: "Welcome to Upasana",
      subtitle: "Your spiritual companion in the digital world",
      description: "Embark on a journey of spiritual growth and divine connection with our comprehensive platform.",
      color: "primary"
    },
    {
      icon: <BsBook size={60} className="text-success" />,
      title: "Sacred Scriptures",
      subtitle: "Access ancient wisdom at your fingertips",
      description: "Read and study sacred texts, mantras, and spiritual teachings from various traditions.",
      color: "success"
    },
    {
      icon: <BsPeople size={60} className="text-warning" />,
      title: "Community of Devotees",
      subtitle: "Connect with fellow spiritual seekers",
      description: "Join a global community of devotees, share experiences, and grow together in faith.",
      color: "warning"
    },
    {
      icon: <BsAward size={60} className="text-info" />,
      title: "Track Your Progress",
      subtitle: "Monitor your spiritual journey",
      description: "Set goals, track your daily practices, and celebrate your spiritual achievements.",
      color: "info"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      {/* Background with gradient and floating elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="position-absolute top-20 start-10 w-32 h-32 bg-primary bg-opacity-10 rounded-circle"></div>
        <div className="position-absolute top-40 end-20 w-24 h-24 bg-success bg-opacity-10 rounded-circle"></div>
        <div className="position-absolute bottom-20 start-20 w-20 h-20 bg-warning bg-opacity-10 rounded-circle"></div>
        <div className="position-absolute bottom-40 end-10 w-28 h-28 bg-info bg-opacity-10 rounded-circle"></div>
      </div>

      <Container className="position-relative z-1 py-5">
        <Row className="min-vh-100 align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            {/* Main Content */}
            <div className="text-center text-lg-start">
              <div className="mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-white bg-opacity-20 backdrop-blur rounded-circle p-4 mb-3">
                  {slides[currentSlide].icon}
                </div>
                <h1 className={`display-4 fw-bold text-${slides[currentSlide].color} mb-3`}>
                  {slides[currentSlide].title}
                </h1>
                <h2 className="h4 text-muted mb-3">
                  {slides[currentSlide].subtitle}
                </h2>
                <p className="lead text-muted mb-4">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Slide Indicators */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-2 mb-4">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-circle transition-all ${
                      index === currentSlide 
                        ? `bg-${slides[currentSlide].color}` 
                        : 'bg-secondary bg-opacity-30'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCurrentSlide(index)}
                  ></div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="px-4 py-3 fw-semibold"
                  onClick={() => navigate('/login')}
                >
                  Get Started
                  <BsArrowRight className="ms-2" />
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  className="px-4 py-3 fw-semibold"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            {/* Feature Cards */}
            <div className="row g-4">
              <Col sm={6}>
                <Card className="border-0 shadow-sm h-100 text-center p-4 hover-lift">
                  <div className="bg-primary bg-opacity-10 rounded d-inline-flex align-items-center justify-content-center p-3 mb-3">
                    <FaPrayingHands size={24} className="text-primary" />
                  </div>
                  <h5 className="fw-semibold mb-2">Daily Prayers</h5>
                  <p className="text-muted small">Access guided prayers and mantras for daily spiritual practice.</p>
                </Card>
              </Col>
              
              <Col sm={6}>
                <Card className="border-0 shadow-sm h-100 text-center p-4 hover-lift">
                  <div className="bg-success bg-opacity-10 rounded d-inline-flex align-items-center justify-content-center p-3 mb-3">
                    <BsHeart size={24} className="text-success" />
                  </div>
                  <h5 className="fw-semibold mb-2">Meditation</h5>
                  <p className="text-muted small">Practice meditation with guided sessions and mindfulness exercises.</p>
                </Card>
              </Col>
              
              <Col sm={6}>
                <Card className="border-0 shadow-sm h-100 text-center p-4 hover-lift">
                  <div className="bg-warning bg-opacity-10 rounded d-inline-flex align-items-center justify-content-center p-3 mb-3">
                    <BsBook size={24} className="text-warning" />
                  </div>
                  <h5 className="fw-semibold mb-2">Sacred Texts</h5>
                  <p className="text-muted small">Read and study ancient scriptures and spiritual literature.</p>
                </Card>
              </Col>
              
              <Col sm={6}>
                <Card className="border-0 shadow-sm h-100 text-center p-4 hover-lift">
                  <div className="bg-info bg-opacity-10 rounded d-inline-flex align-items-center justify-content-center p-3 mb-3">
                    <BsAward size={24} className="text-info" />
                  </div>
                  <h5 className="fw-semibold mb-2">Achievements</h5>
                  <p className="text-muted small">Track your spiritual progress and celebrate milestones.</p>
                </Card>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Floating spiritual symbols */}
      <div className="position-absolute top-10 end-10 text-primary opacity-10">
        <FaOm size={40} />
      </div>
      <div className="position-absolute bottom-10 start-10 text-success opacity-10">
        <FaPrayingHands size={40} />
      </div>
    </div>
  );
}
