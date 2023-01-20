const Controller=require( '../../../controllers/front/venue.controller')
const express=require('express')
const router=express.Router()

router.get('/list',Controller.list)
router.get('/:id',Controller.getOne)

// router.patch('/edit/:id',uploadMultiple,Controller.edit)
// router.post('/create',uploadMultiple,Controller.create)
// router.delete('/delete/:id',Controller.remove)

module.exports = router