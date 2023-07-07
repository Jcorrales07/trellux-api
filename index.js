const express = require('express')

// express setup
const app = express()
const port = 7777

// db connection
const db = require('./database')
const { UserSchema, UserModel } = require('./models/Users.model')

app.get('/', (req, res) => {
    // create a new user

    UserSchema.methods.encryptPassword('')

    UserModel.create({
        name: 'Joe',
        lastname: 'Corrales',
        username: 'jcorralesss',
        email: 'corralesjoe07@gmail.com',
        password: '123456',
        salt: '123456',
    })
})

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
