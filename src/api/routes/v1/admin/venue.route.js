const Controller=require( '../../../controllers/admin/venue.controller')
const express=require('express')
const router=express.Router()

router.get('/list',Controller.list)
router.post('/edit/:id',Controller.edit)
router.post('/create',Controller.create)
router.delete('/delete/:id',Controller.remove)

module.exports = router