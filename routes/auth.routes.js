const Router = require('express')
const {validation} = require('../controllers/Validation.Controller.js')
const {favorites} = require('../controllers/Favorites.Controller.js')

const router = new Router()

const { registration, autorisation } = require('../controllers/Auth.Controllers.js')
const { verifyToken } = require('../controllers/Verification.Controller.js')

router.post('/registration', validation, registration)
router.post('/user-auth', autorisation)
router.post('/favorites/:id', verifyToken, favorites )
router.post('/check', verifyToken, (req, res) => res.status(200).json({user_data: req.user_data}))

module.exports = router
