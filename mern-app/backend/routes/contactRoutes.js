// backend/routes/contactRoutes.js
const express = require('express');
const { addContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addContact).get(protect, getContacts);
router.route('/:id').put(protect, updateContact).delete(protect, deleteContact);

module.exports = router;