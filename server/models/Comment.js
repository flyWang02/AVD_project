const mongoose = require("mongoose")
const Schema= mongoose.Schema
let CommentSchema = new Schema({
    Postid:String,
    authorid:String,
    text:String,
    eddate:String, 
    /*
    agree:Array
    disagress:Array
    */
})

module.exports = mongoose.model("comment",CommentSchema)