const { Schema, model } = require('mongoose')

const ColumnSchema = new Schema(
    {
        kanbanId: {
            type: String,
            ref: 'Kanban',
            required: true,
        },
        columnId: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        tasksIds: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
)

const ColumnModel = model('Column', ColumnSchema, 'columns')

module.exports = {
    ColumnSchema,
    ColumnModel,
}
