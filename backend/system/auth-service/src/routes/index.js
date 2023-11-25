var express = require('express');
const {
    registerUser,
    validateTokenWithRole,
    loginUser,
    requestRefreshToken,
} = require('../controllers/AuthController');
var router = express.Router();

router.post('/register', registerUser);
router.post('/validate', validateTokenWithRole);
router.post('/login', loginUser);
router.post('/refresh-token', requestRefreshToken);
module.exports = router;
