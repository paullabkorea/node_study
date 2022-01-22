const jwt = require('jsonwebtoken')
const { Users }  = require('../models')
require('dotenv').config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    const [tokenType, tokenValue] = authorization.split(" ");
    if (tokenType !== 'Bearer') {
        res.status(400).send({
            erroMessage: '로그인 후 사용하세요!',
        })
        return
    }
    try {
        const { userId } = jwt.verify(tokenValue, process.env.MY_SECRET)
        Users.findByPk(userId).then((user) => {
            res.locals.user = user
            next()
        })
    } catch (error) {
        res.status(400).send({
            erroMessage: '로그인 후 사용하세요!',
        })
        return
    }
}