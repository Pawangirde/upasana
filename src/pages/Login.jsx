// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { BsEye, BsEyeSlash, BsGoogle, BsApple } from 'react-icons/bs';
import { FaOm } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - navigate to home
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // TODO: Implement social login
    console.log(`${provider} login clicked`);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            {/* Header */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle p-3 mb-3">
                <FaOm size={32} className="text-white" />
              </div>
              <h1 className="h3 fw-bold text-dark mb-2">Welcome back</h1>
              <p className="text-muted">Sign in to your Upasana account</p>
            </div>

            {/* Login Card */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                {/* Error Alert */}
                {error && (
                  <Alert variant="danger" className="mb-4" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                {/* Login Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-dark">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="py-2 px-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-dark">Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="py-2 px-3 pe-5"
                        required
                      />
                      <Button
                        type="button"
                        variant="link"
                        className="position-absolute top-50 end-0 translate-middle-y text-muted p-0 me-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="text-muted"
                    />
                    <Button variant="link" className="text-primary p-0 fw-semibold text-decoration-none">
                      Forgot password?
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100 py-2 fw-semibold mb-4"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </Form>

                {/* Divider */}
                <div className="text-center mb-4">
                  <span className="bg-white px-3 text-muted">or continue with</span>
                  <hr className="mt-n3" />
                </div>

                {/* Social Login Buttons */}
                <div className="row g-2 mb-4">
                  <Col>
                    <Button 
                      variant="outline-secondary" 
                      className="w-100 py-2 fw-semibold"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                    >
                      <BsGoogle className="me-2" />
                      Google
                    </Button>
                  </Col>
                  
                  <Col>
                    <Button 
                      variant="outline-secondary" 
                      className="w-100 py-2 fw-semibold"
                      onClick={() => handleSocialLogin('apple')}
                      disabled={isLoading}
                    >
                      <BsApple className="me-2" />
                      Apple
                    </Button>
                  </Col>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Button 
                      variant="link" 
                      className="text-primary p-0 fw-semibold text-decoration-none"
                      onClick={() => navigate('/signup')}
                    >
                      Sign up
                    </Button>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-muted small mb-0">
                By signing in, you agree to our{' '}
                <Button variant="link" className=" p-0 small text-decoration-none gap-2 text-primary">
                  Terms of Service
                </Button>{' '}
                and{' '}
                <Button variant="link" className="text-muted p-0 small text-primary">
                  Privacy Policy
                </Button>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
