const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGODB_URI

const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



module.exports = db
