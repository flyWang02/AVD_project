const mongoose = require("mongoose")
const Schema= mongoose.Schema
let PostSchema = new Schema({
    aid:String,
    title:String,
    description:String,
    details:String,
    eddate:String, 
    language:String,
    /*
    agree:Array
    disagress:Array
    */
})

module.exports = mongoose.model("post",PostSchema)