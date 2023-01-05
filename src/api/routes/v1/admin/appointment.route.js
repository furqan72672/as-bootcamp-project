const Controller=require( '../../../controllers/admin/appointment.controller')
const express=require('express')
const router=express.Router()

router.get('/list',Controller.list)
router.post('/edit/:id',Controller.edit)

module.exports = router