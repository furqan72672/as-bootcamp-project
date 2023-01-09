const Controller=require('../../../controllers/admin/office.controller')
const express=require('express')
const router=express.Router()

router.get('/list',Controller.list)
router.post('/create',Controller.create)
router.patch('/edit/:id',Controller.edit)
router.delete('/delete/:id',Controller.remove)


module.exports=router