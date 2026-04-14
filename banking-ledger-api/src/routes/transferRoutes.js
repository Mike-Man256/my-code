const express = require('express');
const router = express.Router();
const { transferFunds, getTransaction }  = require('../controllers/transactionController.js');

router.post('/transfer', transferFunds);

router.get('/', getTransaction);

module.exports = router;
