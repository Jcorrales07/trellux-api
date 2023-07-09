const router = require('express').Router()
const { UserModel, UserSchema } = require('../models/users.model')

// user process setup
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')

// get all users
router.get('/', (req, res) => {
    UserModel.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json('Error: ' + err))
})

// get user by username
router.get('/user-with-username/:username', async (req, res) => {
    const { username } = req.params

    const user = await UserModel.findOne({ username: username })

    user ? res.json(user) : res.json({ message: 'User not found' })
})

// get user by id
router.get('/user-with-id/:userId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
        .then((user) => user)
        .catch((e) => 'Error: ' + e)

    res.json(user)
})

// register user
router.post('/register', async (req, res) => {
    const { name, lastname, username, email, password } = req.body

    const uniqueUser = await UserModel.findOne({
        username: username,
        email: email,
    })

    if (uniqueUser) {
        res.json({ existent_user: uniqueUser })
        return
    }

    const userCreated = await UserModel.create({
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        salt: UserSchema.methods.genSalt(),
        password: UserSchema.methods.encryptPassword(password),
    })

    res.json(userCreated)
})

// login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({ username: username }).then((u) => ({
        _id: u._id,
        name: u.name,
        lastname: u.lastname,
        username: u.username,
        password: u.password,
        email: u.email,
    }))

    if (!bycrypt.compareSync(password, user.password)) {
        res.json({
            message: 'User or password incorrect',
            success: false,
        })
        return
    }

    const accessToken = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)

    res.json({
        message: 'User logged in successfully',
        success: true,
        user: user,
        accessToken: accessToken,
    })
})

// update user
router.put('/:username', async (req, res) => {
    const { username } = req.params
    const { name, lastname, password } = req.body

    const user = await UserModel.findOne({ username: username })

    if (!user) {
        res.json({ message: 'User not found' })
        return
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { username: username },
        {
            name: name,
            lastname: lastname,
            salt: UserSchema.methods.genSalt(),
            password: UserSchema.methods.encryptPassword(password),
            updatedAt: Date.now(),
        }
    )

    res.json(updatedUser)
})

// delete user
router.delete('/:username', (req, res) => {
    const { username } = req.params

    UserModel.findByIdAndDelete({ username: username })
        .then(() =>
            res.status(200).json({
                message: 'User deleted successfully',
                success: true,
            })
        )
        .catch((e) =>
            res.status(400).json({
                message: `Error deleting user ${e}`,
                success: false,
            })
        )
})

module.exports = router
