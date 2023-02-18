const express = require("express");
const cors = require("cors")
const {connection} = require("./db")
const {userRouter} = require("./routes/users.routes")
const {noteRouter} = require("./routes/notes.routes")
const {authenticate} = require("./middleware/authenticate.middleware")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)

app.listen(process.env.port, async ()=>{
    try{
        await connection
        console.log("Connected to DB")
    } catch(err){
        console.log(err.message)
    }
    console.log("Server is listening at port 7070")
})