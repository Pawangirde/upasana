import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import PageLayout from "../PageLayout";

const JoinUpasana = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    upasanaDate: "2025-07-07",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedAdhyaya, setAssignedAdhyaya] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomAdhyaya = Math.floor(Math.random() * 21) + 1;
    setAssignedAdhyaya(randomAdhyaya);
    setIsSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <Container className="py-5 mt-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center shadow mt-4">
              <Card.Body>
                <BsCheckCircle size={48} className="text-success mb-3" />
                <h2>बधाई हो! 🎉</h2>
                <p>आपका पंजीकरण सफल हो गया है</p>

                <Alert variant="success" className="mt-4">
                  <h4>आपका आवंटन</h4>
                  <p className="mb-0">अध्याय {assignedAdhyaya}</p>
                  <small>गजानन विजयी गाथा</small>
                </Alert>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    onClick={() => navigate("/upasana/102")}
                  >
                    उपासना विवरण देखें
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/")}
                  >
                    होम पर वापस जाएं
                  </Button>
                </div>

                <p className="mt-3 text-muted small">
                  आपको SMS और ईमेल के माध्यम से जानकारी भेजी जाएगी
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <PageLayout>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow mt-4 rounded">
              <Card.Body>
                <div className="text-center mb-4">
                  <div
                    className="bg-light rounded-circle d-inline-flex justify-content-center align-items-center"
                    style={{ width: 64, height: 64 }}
                  >
                    <span className="fs-2">🕉️</span>
                  </div>
                  <h2 className="mt-3">उपासना में जुड़ें</h2>
                  <p className="text-muted">
                    गजानन महाराज की साप्ताहिक उपासना में भाग लें
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>पूरा नाम *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="आपका पूरा नाम दर्ज करें"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>मोबाइल नंबर *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      placeholder="10 अंकों का मोबाइल नंबर"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>ईमेल (वैकल्पिक)</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="आपका ईमेल पता"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>उपासना सप्ताह चुनें *</Form.Label>
                    <Form.Select
                      name="upasanaDate"
                      value={formData.upasanaDate}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="2025-07-07">जुलाई 7-13, 2025</option>
                      <option value="2025-07-14">जुलाई 14-20, 2025</option>
                      <option value="2025-07-21">जुलाई 21-27, 2025</option>
                    </Form.Select>
                  </Form.Group>

                  <Alert variant="info">
                    <strong>📝 नोट:</strong>
                    <ul className="mb-0 mt-2 ps-3">
                      <li>प्रत्येक व्यक्ति को एक अध्याय आवंटित किया जाएगा</li>
                      <li>दैनिक अध्याय पूरा करना आवश्यक है</li>
                      <li>21 सदस्यों की टीम बनाई जाएगी</li>
                    </ul>
                  </Alert>

                  <Button
                    type="submit"
                    disabled={!formData.name || !formData.mobile}
                    className="w-100 btn-primary"
                  >
                    पंजीकरण करें
                  </Button>
                </Form>

                <p className="text-center mt-4 text-muted small">
                  पंजीकरण करके, आप नियम और शर्तों से सहमत हैं
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
};

export default JoinUpasana;
