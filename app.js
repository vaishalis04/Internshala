require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()

const logger = require("morgan")
const ErrorHandler = require("./utils/errorHandler")
const {generatedErrors} = require("./middlewares/errors")


// db connection
require("./models/database").connectDatabase()

app.use(logger("tiny"))

// bodyparser

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// session and cookie
const session = require("express-session")
const cookieParser = require("cookie-parser")
 app.use(session({
    resave:true,saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
 }))
 app.use(cookieParser())

//  express file upload

const fileupload = require("express-fileupload")
app.use(fileupload())

// Routes
app.use("/user",require("./routes/indexRoutes"))
app.use("/resume",require("./routes/resumeRoutes"))
app.use("/employee",require("./routes/employeeRoutes")


)

// error

app.all("*",(req,res,next) =>{
    next(new ErrorHandler(`requested url not found ${req.url}`,404))
})

app.use(generatedErrors)


app.listen(process.env.PORT,console.log(`server running on port ${process.env.PORT}`))