const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('User', UserSchema, 'users')
