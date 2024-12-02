import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ContactForm = ({ contact, setEditContact }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setMobile(contact.mobile);
      setEmail(contact.email);
    }
  }, [contact]);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isMobileValid = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/; // Adjust the regex as needed for your region
    return mobileRegex.test(mobile);
  };

  const addOrUpdateContactHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isMobileValid(mobile)) {
      setError('Invalid mobile number. Please enter a valid 10-digit number.');
      setLoading(false);
      return;
    }

    if (!isEmailValid(email)) {
      setError('Invalid email address. Please enter a valid email.');
      setLoading(false);
      return;
    }

    try {
      if (contact) {
        // Update existing contact
        await axios.put(
          `https://backend-yiez.onrender.com/api/contacts/${contact._id}`,
          { name, mobile, email },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setEditContact(null); // Reset the edit state after successful update
      } else {
        // Add new contact
        await axios.post(
          'https://backend-yiez.onrender.com/api/contacts',
          { name, mobile, email },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      setName('');
      setMobile('');
      setEmail('');
    } catch (err) {
      setError('Error saving contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <h3>{contact ? 'Edit Contact' : 'Add a Contact'}</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={addOrUpdateContactHandler}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (contact ? 'Updating Contact...' : 'Adding Contact...') : (contact ? 'Update Contact' : 'Add Contact')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
