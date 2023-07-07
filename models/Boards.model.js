const { Schema, model } = require('mongoose')

const BoardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        username: {
            type: Schema.Types.String,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Board', BoardSchema, 'boards')