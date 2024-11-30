// backend/controllers/contactController.js
const Contact = require('../models/Contact');

const addContact = async (req, res) => {
  const { name, mobile, email } = req.body;
  const contact = new Contact({ userId: req.user.id, name, mobile, email });
  await contact.save();
  res.status(201).json({ message: 'Contact added successfully' });
};

const getContacts = async (req, res) => {
  const contacts = await Contact.find({ userId: req.user.id });
  res.json(contacts);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, mobile, email } = req.body;
  await Contact.findByIdAndUpdate(id, { name, mobile, email });
  res.json({ message: 'Contact updated successfully' });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  res.json({ message: 'Contact deleted successfully' });
};

module.exports = { addContact, getContacts, updateContact, deleteContact };