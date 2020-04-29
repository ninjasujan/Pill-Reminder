const express = require('express');
const router = express.Router();

const { getRegister } = require('../controllers/patient');

router.get('/register', getRegister);

module.exports = router;
