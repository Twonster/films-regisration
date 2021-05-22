const JWT = require('jsonwebtoken')
const User = require('../modules/User')

module.exports = {
    verifyToken: async (req, res, next) => {
        if (req.headers.autorisation) {
            try {
                const bearer = req.headers.autorisation.split(' ')[1]
                
                if (!bearer) return next()

                const decodedBearer = JWT.verify(bearer, 'secretkey')

                const { 
                    user_id, 
                    user_name, 
                    user_lastname,
                    user_nickname,
                    user_email,
                    favorite_films
                } = await User.findOne({ user_id: decodedBearer.user })

                return res.status(200).json({
                    message: 'login is complete',
                    user: {
                        user_id, 
                        user_name, 
                        user_lastname,
                        user_nickname,
                        user_email,
                        favorite_films
                    }
                })

            } catch (error) {
                return res.status(401).json({message: 'auth-token-catch error'})
            }
        } else {
            return next()
        }
        
        
   }
}