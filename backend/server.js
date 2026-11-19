require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('ServiGo API is running');
});

// Connect to database, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});