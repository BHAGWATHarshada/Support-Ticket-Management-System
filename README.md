Support Ticket Management System

Tech Stack
  - Frontend: React, Bootstrap
  - Backend: Node.js, Express
  - Database: MongoDB
  - Authentication: JWT

Features

  - User authentication and authorization
  - Role-based access (User / Admin)
  - Support ticket creation and management
  - Secure APIs with JWT
  - Basic filtering and pagination for tickets

User Flow

  - User registers and logs in
  - User creates a support ticket
  - User can view only their own tickets
  - User can delete their own ticket
  - User cannot update ticket status or priority
  - User cannot view other users tickets

Admin Flow

  - Admin logs in
  - Admin can view all tickets from all users
  - Admin can update ticket status
  - Admin can update ticket priority
  - Admin can delete any ticket
  
  - Admin cannot create tickets

Setup Steps

Backend : 

  - cd Backend
  - npm install
  - npm run dev

Frontend :

  - cd Frontend
  - npm install
  - npm run dev
    
Environment Variables

- PORT=5000
- MONGO_URI=mongodb+srv://harshadarb1974_db_user:xggc3cLymPQC2Jal@cluster0.5yvmvcc.mongodb.net/ticket_support
- JWT_SECRET=harshada@101

(.env is added only because its a demo )

API List

Auth:
- POST /auth/register
- POST /auth/login

Tickets:
- POST /tickets – Create ticket (User)
- GET /tickets – Get tickets (User: own, Admin: all)
- GET /tickets/:id – Get ticket by ID
- PATCH /tickets/:id – Update ticket (Admin)
- DELETE /tickets/:id – Delete ticket (Admin)
