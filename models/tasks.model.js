const { Schema, model } = require('mongoose')

const TaskSchema = new Schema(
    {
        kanbanId: {
            type: String,
            ref: 'Kanban',
            required: true,
        },
        taskId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const TaskModel = model('Task', TaskSchema, 'tasks') 

module.exports = {
    TaskSchema,
    TaskModel
}
