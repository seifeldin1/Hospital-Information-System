import express from "express"
const registrationController = require('../Controllers/registration.controller')
const router = express.Router()

router.post('/signUp', registrationController.register)
router.post('/login', registrationController.login)

export default router
