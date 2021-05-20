const Router = require('express')
const uniqid = require('uniqid')
const { check, validationResult } = require('express-validator')
const JWT = require('jsonwebtoken')

const User = require('../modules/User')
// const bcrypt = require('bcryptjs')

const router = new Router()

router.post('/registration',

    [
        check('user_email', 'Uncorrect email').isEmail(),
        check('user_password', 'Password must be longer 3 and shorter than 12 symbols').isLength({min: 3, max: 12})
    ],

    async (req, res) => {
        try {
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({ message: 'uncorrect request', validationErrors, status: 400 })
            }

            const { user_email, user_password, user_name, user_lastname, user_nickname } = req.body
            const candidate = await User.findOne({ user_email })
            // console.log('candidate: ', candidate)
            if (candidate) {
               return res.status(400).json({ message: `user with email ${user_email} already exist`, status: 400 })
            } 
            
            // const hashPassword = await bcrypt.hash(password, 15)
            const user_id = uniqid.time()
            const user = new User({ user_email, user_password, user_id, user_name, user_lastname, user_nickname })
            const DBresponse = await user.save()
            
            return res.json({ message: `user with ${DBresponse.user_id} id was created`, status: 200 })

        } catch (error) {
            res.send({message: "server error", status: 500, error})
        }
    }
)

router.post('/user-auth', 
    async (req, res) => {
        try {
            const { user_email, user_password } = req.body
            const candidate = await User.findOne({ user_email })

            if (candidate) {
                if (user_password === candidate.user_password) {
                    return JWT.sign( {user: user_email}, 'secretkey', (err, token) => res.json({ token, status: 200, message: 'login is completed' }).status(200) )
                    // return res.status(200).json({ message: 'Sign in is completed' })
                } else {
                    return res.status(400).json({ message: 'Password is incorrect, please try again', status: 400 })
                }
            } else {
                return res.status(400).json({ message: `This email (${user_email}) has not exist in database, please sign up`, status: 400 })
            }

        } catch (error) {
            res.send({message: "server error", status: 500, error})
        }
    }
)


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['autorised']

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1]
        req.token = bearer
        next()
    } else {
        res.sendStatus(403)
    }
}
// router.get('/registration', (req, res) => {
//     return res.json({message: 'it\'s wokr!!11!1'})
// } )

module.exports = router
