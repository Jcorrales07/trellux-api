const express = require('express')

// express setup
const app = express()
const port = 7777
const bodyParser = require('body-parser')
const cors = require('cors')

const options = {
    origin: 'http://localhost:5173',
}

app.use(cors(options))
app.use(bodyParser.json())

// db connection
const db = require('./database')

//router setup
const routerApi = require('./routes')
routerApi(app)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.get('/register', (req, res) => {
//     // create a new user
//     const { _name, _lastname, _username, _email, _password } = req.body

//     UserModel.create({
//         name: _name,
//         lastname: _lastname,
//         username: _username,
//         email: _email,
//         password: UserSchema.methods.encryptPassword(_password),
//     })
//         .then((user) => {
//             res.json(user)
//         })
//         .catch((err) => {
//             res.send('Error creating user')
//         })
// })

// app.get('/login', async (req, res) => {
//     // login a user
//     // const { _username, _password } = req.body

//     let _username = 'jcorralesss'
//     let _password = '123456'

//     UserModel.findOne({ username: _username }).then((user) => {
//         if (user) {
//             const verify = UserSchema.methods.validatePassword(
//                 _username,
//                 _password
//             )
//             if (verify) {
//                 res.json(user)
//                 return
//             }
//             res.send('Wrong password')
//         }
//     })
// })

// app.get('/users', async (req, res) => {
//     const users = await UserModel.find()
//     res.json(users)
// })

// db connection
// only if the db connection is successful, start the server

db.then(() => {
    console.log('MongoDB Connected')
    console.log('Starting server...')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((err) => {
    console.warn(err)
})
