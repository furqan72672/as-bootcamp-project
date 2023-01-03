const express = require('express')
const router = express.Router()
const settingsRoutes = require('./settings.route')
const authRoutes = require('./auth.route')


router.use('/auth',authRoutes)
router.use('/settings', settingsRoutes)

module.exports = router
