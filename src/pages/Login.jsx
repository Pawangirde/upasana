// src/pages/Login.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // 🔐 TODO: Authentication logic here
    if (email && password) {
      navigate('/home');
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="text-primary mb-4">Login to Upasana</h2>
      <form className="w-100" style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input type="email" className="form-control" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mb-4">
          <input type="password" className="form-control" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
  );
}
