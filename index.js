const express = require('express')

// express setup
const app = express()
const port = 7777

// db connection
const db = require('./database')

app.get('/', (req, res) => {
    res.send('Hello World!')
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
