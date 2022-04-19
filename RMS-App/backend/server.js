const dotenv = require('dotenv').config()
dotenv.config()

const express = require('express')
const cors = require('cors')
const session = require('express-session')

// express app init and config
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3001',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
    })
)

// pg init and config
const { Client } = require('pg')
const conObject = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
}

const client = new Client(conObject)
client.connect()

// session store and session config
const store = new (require('connect-pg-simple')(session))({
    conObject,
})

app.use(
    session({
        store: store,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
)

// now listen on port 3000...
const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})