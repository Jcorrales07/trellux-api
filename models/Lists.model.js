const { Schema, model } = require('mongoose')

const ListSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        boardId: {
            type: Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('List', ListSchema, 'lists')
