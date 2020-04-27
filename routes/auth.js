const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth');

router.get('/', login);

module.exports = router;
