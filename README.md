# AccessHub

AccessHub is a simple full-stack authentication system built with Node.js, Express, MySQL, and JWT. It provides secure user registration, login, and protected routes using token-based authentication.

---

## Features

- 🔐 User Registration (passwords hashed with bcrypt)
- 🔑 Secure Login with JWT (10-minute expiration)
- 🛡 Protected Routes using middleware
- ❌ Account Deletion (authenticated users only)

---

## Tech Stack

Node.js • Express.js • MySQL • bcrypt • JSON Web Token (JWT) • dotenv • HTML • CSS • JavaScript

---

## Setup

1. Clone the repository  
2. Install dependencies:
   npm install  
3. Create a `.env` file in the root folder:
   SQL_PASS=your_mysql_password  
   JWT_SECRET=your_secret_key  
4. Start the server:
   node server.js  

---

## Database Setup

Run the following SQL:

CREATE DATABASE accesshub;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

---

## 🤝 Contributing

Want to contribute to AccessHub? Fork the repository and submit a Pull Request.

---

## Author

Developed by Alexpandiyan.
