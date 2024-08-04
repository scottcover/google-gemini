const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Registration failed' });
      return;
    }
    res.send({ message: 'User registered!' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Login failed' });
      return;
    }
    if (result.length > 0) {
      res.send({ message: 'Login successful!' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
});

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'test@test.test', 
    subject: `Contact Form Submission: ${subject}`,
    text: `You have a new contact form submission from ${name} (${email}):\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.send({ message: 'Contact form submitted successfully!' });
    }
  });
});

app.post('/ask-gemini', async (req, res) => {
  const { question } = req.body;

  try {
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = await response.text();
    res.send({ answer: text });
  } catch (error) {
    console.error('Error in /ask-gemini endpoint:', error);
    res.status(500).send({ message: 'Failed to get response from Gemini' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

