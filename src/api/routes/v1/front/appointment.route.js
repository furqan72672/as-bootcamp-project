const Controller=require( '../../../controllers/front/appointment.controller')
const express=require('express')
const router=express.Router()

router.get('/list',Controller.list)
router.post('/create',Controller.create)

// router.patch('/edit/:id',uploadMultiple,Controller.edit)
// router.post('/create',uploadMultiple,Controller.create)
// router.delete('/delete/:id',Controller.remove)

module.exports = router