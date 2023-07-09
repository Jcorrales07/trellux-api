const { UserModel } = require('../models/users.model')

// user process setup
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserService {
    constructor() {
        this.users = []
    }

    async getAllUsers() {
        this.users = await UserModel.find()
        return this.users
    }

    async getUserById(userId) {
        return await UserModel.findById(userId).then((user) => user)
    }

    async getUserByUsername(args) {
        console.log(args)
        return await UserModel.findOne(args)
    }

    async registerUser(user) {
        return await UserModel.create(user)
    }

    async loginUser(username, password) {
        const user = await this.getUserByUsername({ username }).then((u) => ({
            _id: u._id,
            name: u.name,
            lastname: u.lastname,
            username: u.username,
            password: u.password,
            email: u.email,
        }))

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            res.json({
                message: 'User or password incorrect',
                success: false,
            })
            return
        }

        const accessToken = jwt.sign(
            JSON.stringify(user),
            process.env.JWT_SECRET
        )

        return {
            accessToken,
            user,
        }
    }

    async updateUser(userId, user) {
        return await UserModel.findByIdAndUpdate(userId, user)
    }

    async deleteUserBy(args) {
        await UserModel.findOneAndRemove(args)
    }
}

module.exports = {
    UserService,
}
