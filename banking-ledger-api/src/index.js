const express = require('express');
const pool = require('./src/config/db.js');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes.js');
const accountRoutes = require('./routes/accountRoutes.js');
const transactionRoutes = require('./routes/transferRoutes.js');


const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/accounts', accountRoutes);

app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 