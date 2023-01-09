const Controller=require( '../../../controllers/admin/booking.controller')
const express=require('express')
const router=express.Router()

router.get('/list',Controller.list)

module.exports = router