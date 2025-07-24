import React, { useState } from "react";
import { Container, Card, Row, Col, Button, Form, Badge, ListGroup, ProgressBar } from "react-bootstrap";
import { BsPerson, BsGear, BsBell, BsShield, BsHeart, BsBook, BsCalendar, BsTrophy } from "react-icons/bs";
import {  FaEdit } from "react-icons/fa";
// import { useLanguage } from "../context/LanguageContext";
import PageLayout from "../PageLayout";

export default function Profile() {
  // const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Devotee User",
    email: "devotee@upasana.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    joinDate: "January 2024",
    avatar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop&crop=face",
    level: "Intermediate",
    points: 1250,
    streak: 15,
    totalUpasanas: 45,
    completedTasks: 89
  });

  const [editForm, setEditForm] = useState(profile);

  const achievements = [
    { id: 1, title: "First Upasana", description: "Completed your first upasana", icon: "🕉️", earned: true },
    { id: 2, title: "7-Day Streak", description: "Maintained 7-day practice streak", icon: "🔥", earned: true },
    { id: 3, title: "Scripture Reader", description: "Read 10 spiritual books", icon: "📖", earned: true },
    { id: 4, title: "Meditation Master", description: "Complete 30 days of meditation", icon: "🧘", earned: false },
    { id: 5, title: "Devotee", description: "Complete 100 upasanas", icon: "🙏", earned: false },
    { id: 6, title: "Guru", description: "Complete 365 days of practice", icon: "👑", earned: false }
  ];

  const stats = [
    { label: "Total Upasanas", value: profile.totalUpasanas, icon: BsCalendar, color: "primary" },
    { label: "Completed Tasks", value: profile.completedTasks, icon: BsBook, color: "success" },
    { label: "Current Streak", value: profile.streak, icon: BsHeart, color: "danger" },
    { label: "Total Points", value: profile.points, icon: BsTrophy, color: "warning" }
  ];

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner": return "success";
      case "Intermediate": return "warning";
      case "Advanced": return "danger";
      case "Master": return "dark";
      default: return "secondary";
    }
  };

  const getProgressPercentage = () => {
    return Math.min((profile.points / 2000) * 100, 100);
  };

  return (
    <PageLayout>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="common-heading">Profile</h2>
          <Button 
            variant={isEditing ? "success" : "outline-primary"}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="d-flex align-items-center gap-2"
          >
            {isEditing ? "Save" : <FaEdit />}
            {!isEditing && "Edit Profile"}
          </Button>
        </div>

        <Row>
          <Col lg={4} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <div className="position-relative mb-3">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="rounded-circle"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover" }}
                  />
                  {isEditing && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="position-absolute bottom-0 end-0 rounded-circle"
                      style={{ width: "35px", height: "35px" }}
                    >
                      <FaEdit size={12} />
                    </Button>
                  )}
                </div>
                
                {isEditing ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        placeholder="Full Name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        placeholder="Email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        placeholder="Phone"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        placeholder="Location"
                      />
                    </Form.Group>
                    <div className="d-flex gap-2">
                      <Button variant="success" onClick={handleSave} className="flex-grow-1">
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <>
                    <h5 className="mb-1">{profile.name}</h5>
                    <p className="text-muted mb-2">{profile.email}</p>
                    <p className="text-muted small mb-3">{profile.phone}</p>
                    <p className="text-muted small mb-3">{profile.location}</p>
                    <Badge bg={getLevelColor(profile.level)} className="mb-3">
                      {profile.level}
                    </Badge>
                    <p className="text-muted small">Member since {profile.joinDate}</p>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8} className="mb-4">
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Your Progress</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Level Progress</span>
                    <span className="text-muted">{Math.round(getProgressPercentage())}%</span>
                  </div>
                  <ProgressBar 
                    now={getProgressPercentage()} 
                    variant="primary"
                    className="mb-3"
                  />
                  <small className="text-muted">
                    {profile.points} / 2000 points to next level
                  </small>
                </div>
                
                <Row>
                  {stats.map((stat, index) => (
                    <Col key={index} xs={6} className="mb-3">
                      <div className="text-center">
                        <div className="mb-2">
                          <stat.icon size={24} className={`text-${stat.color}`} />
                        </div>
                        <h4 className="mb-1">{stat.value}</h4>
                        <small className="text-muted">{stat.label}</small>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h5 className="mb-0">Achievements</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {achievements.map((achievement) => (
                    <Col key={achievement.id} md={6} className="mb-3">
                      <div className={`d-flex align-items-center p-3 rounded ${achievement.earned ? 'bg-light' : 'bg-light opacity-50'}`}>
                        <div className="me-3">
                          <span style={{ fontSize: "2rem" }}>{achievement.icon}</span>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{achievement.title}</h6>
                          <small className="text-muted">{achievement.description}</small>
                        </div>
                        {achievement.earned && (
                          <Badge bg="success">✓</Badge>
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Account Settings</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item action className="d-flex align-items-center">
                  <BsPerson className="me-3" />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Personal Information</h6>
                    <small className="text-muted">Update your personal details</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item action className="d-flex align-items-center">
                  <BsBell className="me-3" />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Notifications</h6>
                    <small className="text-muted">Manage notification preferences</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item action className="d-flex align-items-center">
                  <BsShield className="me-3" />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Privacy & Security</h6>
                    <small className="text-muted">Manage your privacy settings</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item action className="d-flex align-items-center">
                  <BsGear className="me-3" />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">App Settings</h6>
                    <small className="text-muted">Customize app preferences</small>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Recent Activity</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="bg-success rounded-circle me-3" style={{ width: "8px", height: "8px" }}></div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Completed Morning Aarti</h6>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle me-3" style={{ width: "8px", height: "8px" }}></div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Joined Evening Upasana</h6>
                    <small className="text-muted">1 day ago</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="bg-warning rounded-circle me-3" style={{ width: "8px", height: "8px" }}></div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Earned 50 points</h6>
                    <small className="text-muted">2 days ago</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="bg-info rounded-circle me-3" style={{ width: "8px", height: "8px" }}></div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Read Bhagavad Gita Chapter 1</h6>
                    <small className="text-muted">3 days ago</small>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
} 