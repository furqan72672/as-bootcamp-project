const Controller=require( '../../../controllers/admin/auth.controller')
const express=require('express')
const router=express.Router()

router.post('/create-once',Controller.createOnce)
router.post('/login',Controller.login)

module.exports = router