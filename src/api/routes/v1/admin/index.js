const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const appointmentRoutes = require('./appointment.route')
const venueRoutes = require('./venue.route')
const ratingRoutes = require('./rating.route')
const { adminAuth } = require('../../../middlewares/authentication')


router.use('/auth',authRoutes)
router.use('/appointment',adminAuth,appointmentRoutes)
router.use('/venue',adminAuth,venueRoutes)
router.use('/rating',adminAuth,ratingRoutes)

module.exports = router
