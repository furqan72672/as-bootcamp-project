const express = require('express')
const authRoutes = require('./auth.route')
const venueRoutes = require('./venue.route')
const bookingRoutes = require('./booking.route')
const appointmentRoutes = require('./appointment.route')
const ratingRoutes = require('./rating.route')
const router = express.Router()
const { cpUpload } = require('../../../utils/upload')
const { userAuth } = require('../../../middlewares/authentication')
/**
 * GET v1/status
 */
router.use('/auth', authRoutes)
router.use('/venue',venueRoutes)
router.use('/rating',userAuth,ratingRoutes)
router.use('/appointment',userAuth,appointmentRoutes)
router.use('/booking',userAuth,bookingRoutes)

module.exports = router
