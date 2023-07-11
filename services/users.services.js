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
        console.log('getUserByUsername', args)

        let user = await UserModel.findOne({ username: args.username })

        if (!user) {
            user = await UserModel.findOne({ email: args.email })
        }
        return user
    }

    async registerUser(user) {
        return await UserModel.create(user)
    }

    async loginUser(username, password) {
        try {
            let user = await this.getUserByUsername({
                username,
                email: username,
            })
                .then((u) => u)
                .catch((err) => {
                    console.log('err', err)
                })

            if (!user) {
                return null
            }

            user = {
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                password: user.password,
            }

            const isValidPassword = bcrypt.compareSync(password, user.password)

            if (!isValidPassword) {
                return null
            }

            const accessToken = jwt.sign(
                JSON.stringify(user),
                process.env.JWT_SECRET
            )

            return {
                accessToken,
                user,
            }
        } catch (error) {
            console.log('error', error)
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
