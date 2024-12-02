import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://backend-yiez.onrender.com/api/users/login', { username, password });
      if (data.token) {
        // Save the token to localStorage
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
