const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

const db = require("./config/mongoose-connection")

const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const indexRouter = require("./routes/index")

require('dotenv').config();

// ➡️ 
const expressSession = require("express-session")
const flash = require("connect-flash")            // flash message session ke use kore....
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash())


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")



app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)


app.listen(3000)
