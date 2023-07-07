const { Schema, model } = require('mongoose')

const CardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        listId: {
            type: Schema.Types.ObjectId,
            ref: 'List',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Card', CardSchema, 'cards')
