const express = require('express');
const Controller = require('../../../controllers/front/auth.controller');
const { profileUpload } = require('../../../utils/upload')
const router = express.Router();


router.post('/register',Controller.createUser);
router.post('/login',Controller.login);
router.post('/forgot-password',Controller.forgotPassword);
router.post('/verify',Controller.verifySecret);
router.post('/reset-password',Controller.resetPassword)

module.exports = router;