const express = require("express");
const {noteModel} = require("../models/notes.models")

const noteRouter = express.Router()

noteRouter.get("/", async (req,res) =>{
    const notes = await noteModel.find()
    res.send(notes)
})

noteRouter.post("/create", async (req,res) =>{
    const payload = req.body
    const note = new noteModel(payload)
    await note.save()
    res.send({"msg": "Notes Created"})
})

noteRouter.delete("/delete/:id", async (req,res) =>{
    const noteID = req.params.id
    await noteModel.findByIdAndDelete({_id:noteID})
    res.send({"msg": `Note with id ${noteID} has been deleted`})
})

noteRouter.patch("/update/:id", async (req,res) =>{
    //verify token
    const ID = req.params.id
    const payload = req.body
    try{
   await noteModel.findByIdAndUpdate({_id:ID}, payload)
   res.send({"msg": "Updated the notes"})
    }
    catch(err){
        res.send({ "msg": "Notes cannot be Updated", "error": err.message})
    }
    
})


module.exports={
    noteRouter
}