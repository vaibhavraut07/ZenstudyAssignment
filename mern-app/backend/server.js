// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://vaibhavraut087:xYWAwY3vw04fjoeO@users.xurve.mongodb.net/?retryWrites=true&w=majority&appName=Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
