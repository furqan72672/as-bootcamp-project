const Controller=require('../../../controllers/admin/rating.conttroller')
const express=require('express')
const router=express.Router()

router.get('/list',Controller.list)
router.delete('/delete/:id',Controller.remove)

module.exports=router