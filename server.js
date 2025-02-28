require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const APIRoutes = require('./routes/APIroutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api', APIRoutes);

app.get('/', (req, res) => {
  res.send('API Security Scanner is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
