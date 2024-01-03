const { Schema, model } = require('mongoose')

const KanbanSchema = new Schema(
    {
        kanbanId: {
            type: String,
            ref: 'Board',
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        columnOrder: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
)

const KanbanModel = model('Kanban', KanbanSchema, 'kanbans')

module.exports = {
    KanbanSchema,
    KanbanModel,
}