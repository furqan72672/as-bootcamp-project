const express = require('express');
const Controller = require('../../../controllers/front/auth.controller');
const { profileUpload } = require('../../../utils/upload')
const router = express.Router();


router.route('/register').post(Controller.createUser);
router.post('/login',Controller.login);

module.exports = router;