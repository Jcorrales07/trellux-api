const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

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
        salt: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        imgUrl: String,
    },
    { timestamps: true }
)

UserSchema.methods.genSalt = () => {
    return bcrypt.genSaltSync(10)
}

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, this.salt)
}

UserSchema.methods.validatePassword = password => {
    return bcrypt.compareSync(password, this.password)
}

const UserModel = model('User', UserSchema, 'users')

module.exports = {
    UserSchema,
    UserModel,
}
