import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await axios.get('/api/contacts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContacts(data);
    };

    fetchContacts();
  }, []);

  // Handler for deleting a contact
  const deleteContactHandler = async (contactId) => {
    try {
      await axios.delete(`/api/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContacts(contacts.filter(contact => contact._id !== contactId)); // Remove the deleted contact from the list
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  // Handler for setting contact data to be edited
  const editContactHandler = (contact) => {
    setEditContact(contact);
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <ContactForm contact={editContact} setEditContact={setEditContact} />
      <ul className="list-group mt-3">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact._id} className="list-group-item">
              {contact.name} - {contact.mobile} - {contact.email}
              <button className="btn btn-warning btn-sm ml-2" onClick={() => editContactHandler(contact)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteContactHandler(contact._id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;

