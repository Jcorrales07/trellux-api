const router = require('express').Router()

const userRouter = require('./users.router')
const boardRouter = require('./boards.router')

function routerApi(app) {
    app.use('/v1', router)

    router.use('/users', userRouter)
    router.use('/boards', boardRouter)
}

module.exports = routerApi
