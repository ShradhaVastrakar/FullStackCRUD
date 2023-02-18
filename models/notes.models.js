const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title:String,
    body:String,
    user:String
})

const noteModel = mongoose.model("note", notesSchema)

module.exports = {
    noteModel
}