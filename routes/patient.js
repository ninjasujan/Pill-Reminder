const express = require('express');
const router = express.Router();

/* importing all patient related controller action */
const { getRegister, postRegister } = require('../controllers/patient');

// importing auth middleware
const { isAuth, isAdmin } = require('../middleware/isAuth');

router.get('/register', isAuth, getRegister);

router.post('/post-register', isAuth, isAdmin, postRegister);

module.exports = router;
