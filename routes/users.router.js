const router = require('express').Router()
const { UserModel, UserSchema } = require('../models/users.model')
const { UserService } = require('./../services/users.services')

const service = new UserService()

// get all users
router.get('/', async (req, res) => {
    const users = await service.getAllUsers()

    users.length ? res.json(users) : res.json({ message: 'The DB is empty' })
})

// get user by username
router.get('/user-with-username/:username', async (req, res) => {
    const { username } = req.params

    const user = await service.getUserByUsername({ username: username })

    user ? res.json(user) : res.json({ message: 'User not found' })
})

// get user by id
router.get('/user-with-id/:userId', async (req, res) => {
    const { userId } = req.params
    const user = await service.getUserById(userId)

    user ? res.json(user) : res.json({ message: 'User not found' })
})

// register user
router.post('/register', async (req, res) => {
    const { name, lastname, username, email, password } = req.body

    const isUniqueUser = await service.getUserByUsername({
        username,
        email,
    })

    if (isUniqueUser) {
        res.json({
            success: false,
            message: 'User already exists',
            isUniqueUser,
        })
        return
    }

    const user = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        salt: UserSchema.methods.genSalt(),
        password: UserSchema.methods.encryptPassword(password),
    }

    const userCreated = await service.registerUser(user)

    res.json({
        success: true,
        message: 'User created successfully',
        userCreated,
    })
})

// login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const response = await service.loginUser(username, password)

    if (!response) {
        res.json({
            success: false,
            message: 'Invalid email/username or password',
        })
        return
    }

    res.json({
        success: true,
        message: 'User logged in successfully',
        user: {
            ...response.user,
            accessToken: response.accessToken,
        },
    })
})

// update user
router.put('/:username', async (req, res) => {
    const { username } = req.params
    const { name, lastname, password } = req.body

    const user = await service.getUserByUsername({ username: username })

    if (!user) {
        res.json({ message: 'User not found' })
        return
    }

    const updatedUser = await service.updateUser(
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

// delete user by username
router.delete('/user-with-username/:username', (req, res) => {
    const { username } = req.params

    service
        .deleteUserBy({ username })
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

// delete user by id
// le falta su funcion en el service, por ahora lo veo innecesario
router.delete('/user-with-id/:userId', (req, res) => {
    const { userId } = req.params

    service
        .deleteUserBy(userId)
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
