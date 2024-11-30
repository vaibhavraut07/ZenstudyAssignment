# MERN Contact Registration System

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to register, log in, and manage their contacts. Users can add, edit, and delete contacts from their personal dashboard.

## Features

- User Registration
- User Login
- User Dashboard
- Add New Contacts
- Edit Existing Contacts
- Delete Contacts

## Technologies Used

- MongoDB
- Express
- React
- Node.js
- Bootstrap (for styling)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash 
      cd your-repository
      git clone https://github.com/yourusername/your-repository.git

2. **Run the project**
   ```bash
      npx nodemon server.js
      npm start
    
4. **Open your browser to navigate**
     ```bash
     http://localhost:3000

5. **Project Structure**
   ```bash
       mern-app/
    ├── backend/
    │   ├── controllers/
    │   │   ├── contactController.js
    │   │   └── userController.js
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   ├── models/
    │   │   ├── Contact.js
    │   │   └── User.js
    │   ├── routes/
    │   │   ├── contactRoutes.js
    │   │   └── userRoutes.js
    │   └── [server.js](http://_vscodecontentref_/1)
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── ContactForm.js
    │   │   │   ├── Dashboard.js
    │   │   │   ├── Home.js
    │   │   │   ├── Login.js
    │   │   │   └── Register.js
    │   │   ├── App.js
    │   │   ├── index.css
    │   │   └── index.js
    │   ├── package.json
    │   └── README.md
    ├── .gitignore
    └── README.md
### API EndPoints

**User Routes/Authentication**
- POST /api/users/register: Register a new user
  
- POST /api/users/login: Log in an existing user (returns JWT token)

**Contacts Routes**
- GET /api/contacts: Get all contacts for the logged-in user (requires authentication)
- POST /api/contacts: Add a new contact (requires authentication)
- PUT /api/contacts/:id: Update an existing contact (requires authentication)
- DELETE /api/contacts/:id: Delete a contact (requires authentication)

### Acknowledgements
- MongoDB
- Express
- React
- Node.js
- Bootstrap


### License
**This project is licensed under the MIT License - see the LICENSE file for details.**



   
