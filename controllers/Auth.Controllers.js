const User = require('../modules/User')
const uniqid = require('uniqid')
const { validationResult } = require('express-validator')
const JWT = require('jsonwebtoken')

module.exports = {
    registration: async (req, res) => {
        try {

            const validationErrors = validationResult(req)

            if (!validationErrors.isEmpty()) {
                return res.status(400).json({ message: 'uncorrect request', validationErrors, status: 400 })
            }

            const { user_email, user_password, user_name, user_lastname, user_nickname } = req.body
            const candidate = await User.findOne({ user_email })

            if (candidate) {
               return res.status(400).json({ message: `user with email ${user_email} already exist`, status: 400 })
            } 
            
            // const hashPassword = await bcrypt.hash(password, 5)
            const user_id = uniqid.time()
            const user = new User({ user_email, user_password, user_id, user_name, user_lastname, user_nickname })
            const DBresponse = await user.save()
            
            return res.json({ message: `user with ${DBresponse.user_email} email was created`, status: 200 })

        } catch (error) {
            res.send({message: "server error", status: 500, error})
        }
    },

    autorisation: async (req, res) => {
        try {
            const { user_email, user_password } = req.body
            const candidate = await User.findOne({ user_email })

            if (candidate) {

                const user_data = { 
                   user_id: candidate.user_id,
                   user_email: candidate.user_email,
                   user_name: candidate.user_name,
                   user_lastname: candidate.user_lastname,
                   favorite_films: candidate.favorite_films
                }

                if (user_password === candidate.user_password) {
                    return JWT.sign( { user: candidate.user_id }, 'secretkey', (err, token) => res.json({ token, status: 200, message: 'login is completed', user_data }).status(200) )
                } else {
                    return res.status(400).json({ message: 'Password is incorrect, please try again', status: 400 })
                }
            } else {
                return res.status(400).json({ message: `This email (${user_email}) has not exist in database, please sign up`, status: 400 })
            }

        } catch (error) {
            res.send({ message: "server error", status: 500, error })
        }
    }
}