const Router = require('express')
const {validation} = require('../controllers/Validation.Controller.js')

const router = new Router()

const { registration, autorisation } = require('../controllers/Auth.Controllers.js')
const { verifyToken } = require('../controllers/Verification.Controller.js')

router.post('/registration', validation, registration)
router.post('/user-auth', verifyToken, autorisation)

module.exports = router
