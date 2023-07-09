const router = require('express').Router()

const userRouter = require('./users.router')

function routerApi(app) {
    app.use('/v1', router)

    router.use('/users', userRouter)
}

module.exports = routerApi
