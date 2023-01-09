const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const appointmentRoutes = require('./appointment.route')
const venueRoutes = require('./venue.route')
const ratingRoutes = require('./rating.route')
const bookingRoutes = require('./booking.route')
const officeRoutes=require('./office.route')
const userRoutes=require('./user.route')
const dashboardRoutes=require('./dashboard.route')
const { adminAuth } = require('../../../middlewares/authentication')


router.use('/auth',authRoutes)
router.use('/user',adminAuth,userRoutes)
router.use('/dashboard',adminAuth,dashboardRoutes)
router.use('/appointment',adminAuth,appointmentRoutes)
router.use('/venue',adminAuth,venueRoutes)
router.use('/rating',adminAuth,ratingRoutes)
router.use('/booking',adminAuth,bookingRoutes)
router.use('/office',adminAuth,officeRoutes)

module.exports = router
