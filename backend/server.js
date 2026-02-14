const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASS,
    database: 'accesshub'
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Failed !");
    } else {
        console.log("Connection established");
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedpass = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"

        db.query(sql, [name, email, hashedpass], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: `Email Already Exists` });
                }
                return res.status(500).json({ error: err });
            }

            res.json({ message: `User Regstered succesfully` });
        });
    } catch (error) {
        return res.status(500).json({ error: err });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: `Server error` });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: `user not found` });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: `Email or password invalid` });
        }

        res.json({ message: `Login Sucessfull` });
    });
});

app.listen(port, () => {
    console.log(`The server is running on the port : ${port}`);
});