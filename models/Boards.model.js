const { Schema, model } = require('mongoose')

const BoardSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
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

const BoardModel = model('Board', BoardSchema, 'boards')

module.exports = {
    BoardSchema,
    BoardModel,
}
