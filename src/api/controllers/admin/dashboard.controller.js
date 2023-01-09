const Appointment = require('../../models/appointment.model')
const Booking = require('../../models/booking.model')
const Office = require('../../models/office.model')
const Rating = require('../../models/rating.model')
const User = require('../../models/user.model')
const Venue = require('../../models/venue.model')
const Responses=require('../../utils/responses')
class Controller{
    static async getData(req,res,next){
        const user=await User.countDocuments()
        const venue=await Venue.countDocuments()
        const booking=await Booking.countDocuments()
        const appointment=await Appointment.countDocuments()
        const rating=await Rating.countDocuments()
        const office=await Office.countDocuments()

        const payload={user,venue,booking,appointment,rating,office}

        Responses.success(payload,200,'counts retrieved',res)
    }
}

module.exports=Controller