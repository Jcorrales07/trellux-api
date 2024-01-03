const express = require('express')

// express setup
const app = express()
const port = 7777
const bodyParser = require('body-parser')
const cors = require('cors')

const options = {
    origin: 'http://localhost:5173',
    // origin: 'http://localhost:5174',
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