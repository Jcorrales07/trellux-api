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
    },
    { timestamps: true }
)

const bcrypt = require('bcryptjs')

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(25)
    return await bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const UserModel = model('User', UserSchema, 'users')

module.exports = {
    UserSchema,
    UserModel,
}
