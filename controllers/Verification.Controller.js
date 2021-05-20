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