const { Schema, model } = require('mongoose')

const User = new Schema({
    user_name: { type: String, require: true },
    user_lastname: { type: String, require: true },
    user_nickname: { type: String, unique: false },
    user_email: { type: String, require: true, unique: true },
    user_password: { type: String, require: true, unique: false },
    user_id: { type: String, require: true, unique: true },
    favorite_films: { type: [String] }
})

module.exports = model('User', User)
