const { TaskModel } = require('../models/tasks.model')

class TaskService {
    constructor() {
        this.tasks = []
    }

    async getTasks() {
        return await TaskModel.find({})
    }

    async getTasksWith({ kanbanId }) {
        return await TaskModel.find({ kanbanId: kanbanId })
    }

    async getTasksFrom({ username }) {
        return await TaskModel.find({ username: username })
    }

    async getTaskById({ id }) {
        return await TaskModel.findOne({ id: id })
    }

    async createTask(task) {
        return await TaskModel.create(task)
    }

    async createTasks(tasks) {
        return await TaskModel.insertMany(tasks)
    }

    async updateTask({ id, title }) {
        await TaskModel.updateOne(
            { id: id },
            { $set: { title: title, updatedAt: Date.now() } }
        )
        return await TaskModel.findOne({ id: id })
    }

    async deleteTask({ id }) {
        return await TaskModel.findOneAndRemove({ id: id })
    }

    async deleteAllTasks() {
        return await TaskModel.deleteMany({})
    }
}

module.exports = { TaskService }
