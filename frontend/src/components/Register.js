import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isUsernameValid = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
    return usernameRegex.test(username);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!isUsernameValid(username)) {
      setError('Username must be at least 4 characters long and contain only letters, numbers, and underscores.');
      return;
    }

    if (!isPasswordValid(password)) {
      setError(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    try {
      const { data } = await axios.post('https://backend-yiez.onrender.com/api/users/register', { username, password });
      if (data) {
        navigate('/login'); // Navigate to the login page after successful registration
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
