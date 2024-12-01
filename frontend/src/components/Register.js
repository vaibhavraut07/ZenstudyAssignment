import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${config.API_BASE_URL}/users/register`, { username, password });
      if (data) {
        navigate('/login'); // Navigate to the login page after successful registration
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={registerHandler}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
