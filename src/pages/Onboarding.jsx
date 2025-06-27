// src/pages/Onboarding.js
import { useNavigate } from 'react-router-dom';
// import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4 bg-light">
      <h1 className="text-primary mb-4">Welcome to Upasana</h1>
      <p className="mb-5">Your spiritual companion in the digital world.</p>
      <button className="btn btn-primary mb-2 w-100" onClick={() => navigate('/login')}>Get Started</button>
    </div>
  );
}
