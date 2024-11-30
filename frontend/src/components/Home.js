// frontend/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Contact Registration System</h1>
      <p>Please choose an option:</p>
      <Link to="/register" className="btn btn-primary me-2">Register</Link>
      <Link to="/login" className="btn btn-secondary">Login</Link>
    </div>
  );
};

export default Home;