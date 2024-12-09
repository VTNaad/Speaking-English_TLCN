import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modals/Modal';
import '../css/RegisterScreen.css';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleRegister = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, fullname, email, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message in modal
        setSuccessMessage('Successfully Signed up! Do you want to go to the login page?');
        setShowModal(true);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/login'); // Redirect to login if user clicks OK
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      {/* Left Side: Register Box */}
      <div className="login-box">
        <h2>Sign up</h2>
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
        <div className="input-frame">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="input-frame">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-frame">
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegister}>Sign up</button>

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Link to login */}
        <div className="signup-link">
          <p>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="link">
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Right Side: Welcome Message and Description */}
      <div className="right-section">
        <div style={{ fontSize: '48px', fontWeight: 'bold' }}>Welcome to My Website</div>
        <div className="description">
          This website is designed to help you practice your English speaking skills. Join our community and improve your pronunciation through interactive exercises and feedback.
        </div>
      </div>

      {/* Modal for Success Message */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        message={successMessage}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default RegisterScreen;
