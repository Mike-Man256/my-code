const express = require('express');
const router = express.Router();
const { getAllAccounts, getUserAccount } = require('../controllers/accountController.js');

router.get('/', getAllAccounts);
router.get('/user/:userId', getUserAccount );

module.exports = router;