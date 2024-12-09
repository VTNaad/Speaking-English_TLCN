import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Modal from '../modals/Modal';
import '../css/LoginScreen.css';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleLogin = async () => {
    try { 
      const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.userData));
        console.log("User data saved to localStorage:", data.userData);
        const decodedToken = jwtDecode(data.accessToken);
        const userRole = decodedToken.role;
        setIsModalOpen(true); // Show modal on successful login

        // Automatically navigate to home after 3 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          if (userRole === 1) {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        }, 3000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign in</h2>
        <div className="input-frame">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-frame">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>Sign in</button>
        <div className="login-links">
          <span onClick={() => navigate('/forgot-password')} className="link">
            Forgot password?
          </span>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="signup-link">
          <p>
            Don’t have an account?{' '}
            <span onClick={() => navigate('/register')} className="link">
              Sign up
            </span>
          </p>
        </div>
      </div>
      <div className="right-section">
        <div style={{ fontSize: '48px', fontWeight: 'bold' }}>Welcome to My Website</div>
        <div className="description">
          This website is designed to help you practice your English speaking skills. Join our community and improve your pronunciation through interactive exercises and feedback.
        </div>
      </div>

      {/* Render Modal if login is successful */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Login successful! Redirecting to home..."
        showActions={false}
        onConfirm={() => navigate('/home')}
      />
    </div>
  );
};

export default LoginScreen;
