const Router = require('express')
const {validation} = require('../controllers/Validation.Controller.js')

const router = new Router()

const { registration, auth } = require('../controllers/Auth.Controllers.js')

router.post('/registration', validation, registration)
router.post('/user-auth', auth)

module.exports = router
