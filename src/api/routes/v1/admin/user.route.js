const Controller=require( '../../../controllers/admin/user.controller')
const express=require('express')
const router=express.Router()

router.get('/profile',Controller.getProfile)
router.patch('/profile/:id',Controller.updateProfile)

module.exports = router