const User = require('../modules/User')

module.exports = {
    favorites: async (req, res) => {
        if (!req.user_data && !req.params) return res.status(501).json({ message: 'favorites error' })
        try {

            const user = await User.findOne({ user_id: req.user_data.user_id })
            const target = user.favorite_films.indexOf(req.params.id)
    
            if (target !== -1) {
                user.favorite_films.splice(target, 1)
            } else {
                user.favorite_films.push(req.params.id)
            }

            const update = { favorite_films: user.favorite_films }
            await user.updateOne(update);
            const updatedData = await User.findOne({ user_id: req.user_data.user_id })

            const {
                favorite_films,
                user_email,
                user_id,
                user_name,
                user_lastname
            } = updatedData

            const response = {
                favorite_films,
                user_email,
                user_id,
                user_name,
                user_lastname
            } 

            return res.status(200).json({ message: 'favorites update successfully', user_data: response })
        } catch (error) {
            return res.status(400).json({ message: 'favorites update error', error })
        }
    }

}