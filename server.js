const express = require('express')
const mongojs = require('mongojs')
const mongoose = require('mongoose')
const morgan = require('morgan')

const PORT = 3001
const app = express()

app.use(morgan('dev'))
app.unsubscribe(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

const db = mongojs('fitnesstrackerdb', ["workout"])

db.on('error', error => console.log('DB Error', error))


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))