const router = require('express').Router()
const { TaskService } = require('../services/tasks.services')

const taskService = new TaskService()

// create tasks
router.post('/', async (req, res) => {
    const { kanbanId, taskId, username, content } = req.body

    /*console.log('info desde el frontend', {
        kanbanId,
        taskId,
        username,
        content,
    })*/

    const task = {
        kanbanId: kanbanId,
        taskId: taskId,
        username: username,
        content: content,
    }

    const taskCreated = await taskService.createTask(task)

    if (!taskCreated) {
        res.status(500).json({
            success: false,
            message: 'task not created',
        })
        return
    }

    res.json({
        success: true,
        message: 'task created',
        task,
    })
})

router.post('/multiple', async (req, res) => {
    const tasks = req.body

    console.log('info desde el frontend', tasks)

    const tasksCreated = await taskService.createTasks(tasks)

    if (!tasksCreated) {
        res.status(500).json({
            success: false,
            message: 'tasks not created',
        })
        return
    }

    res.json({
        success: true,
        message: 'tasks created',
        tasksCreated,
    })
})

// get all tasks
router.get('/', async (req, res) => {
    const tasks = await taskService.getTasks()

    tasks.length
        ? res.json(tasks)
        : res.json({ message: 'The task collection is empty' })
})

// get all tasks with kanbanId
router.get('/:kanbanId', async (req, res) => {
    const { kanbanId } = req.params

    const tasks = await taskService.getTasksWith({ kanbanId: kanbanId })

    tasks.length
        ? res.json(tasks)
        : res.json({ message: 'The task collection is empty' })
})

// get tasks by username
router.get('/:username', async (req, res) => {
    const { username } = req.params

    const tasks = await taskService.getTasksFrom({ username })

    // console.log(tasks)
    tasks.length
        ? res.json({
              success: true,
              tasks,
          })
        : res.json({
              success: false,
              message: `${username} doesn't have tasks`,
          })
})

// get task by id
router.get('/:taskId', async (req, res) => {
    const { taskId } = req.params

    const task = await taskService.getTaskById({ taskId: taskId })

    task
        ? res.json({
              success: true,
              task,
          })
        : res.json({
              success: false,
              message: 'task not found',
          })
})

// update task
router.put('/:taskId', async (req, res) => {
    const { taskId } = req.params
    const { content } = req.body

    const task = await taskService.updateTask({
        taskId: taskId,
        content,
    })

    if (!task) {
        res.status(500).json({
            success: false,
            message: 'task not updated',
        })
    }

    res.json({
        success: true,
        message: 'task updated',
        task,
    })
})

// delete task
router.delete('/:taskId', async (req, res) => {
    const { taskId } = req.params

    const task = await taskService.deleteTask({ taskId: taskId })

    if (!task) {
        res.status(500).json({
            success: false,
            message: 'task not deleted',
        })
    }

    res.json({
        success: true,
        message: 'task deleted',
        task,
    })
})

// delete all tasks
router.delete('/', async (req, res) => {
    const task = await taskService.deleteAllTasks()

    res.json({
        success: true,
        message: 'All tasks deleted',
        task,
    })
})

module.exports = router
