const router = require('express').Router()

const taskRouter = require('./tasks.router')
const userRouter = require('./users.router')
const boardRouter = require('./boards.router')
const kanbanRouter = require('./kanbans.router')
const columnRouter = require('./columns.router')

function routerApi(app) {
    app.use('/v1', router)

    router.use('/users', userRouter)
    router.use('/boards', boardRouter)
    router.use('/kanbans', kanbanRouter)
    router.use('/tasks', taskRouter)
    router.use('/columns', columnRouter)
}

module.exports = routerApi
