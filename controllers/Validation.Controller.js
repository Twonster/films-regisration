const { check } = require('express-validator')

module.exports.validation = [
    check('user_email', 'Uncorrect email').isEmail(),
    check('user_password', 'Password must be longer 3 and shorter than 12 symbols').isLength({min: 3, max: 12})
]