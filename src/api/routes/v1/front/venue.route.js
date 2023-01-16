const Controller=require( '../../../controllers/front/venue.controller')
const express=require('express')
const { uploadMultiple, uploadSingle } = require('../../../utils/upload')
const router=express.Router()

router.get('/list',Controller.list)
// router.patch('/edit/:id',uploadMultiple,Controller.edit)
// router.post('/create',uploadMultiple,Controller.create)
// router.delete('/delete/:id',Controller.remove)

module.exports = router