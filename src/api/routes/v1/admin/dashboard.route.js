const Controller=require( '../../../controllers/admin/dashboard.controller')
const express=require('express')
const router=express.Router()

router.get('/data',Controller.getData)

module.exports = router