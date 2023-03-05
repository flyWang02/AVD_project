const mongoose = require("mongoose")
const Schema= mongoose.Schema
let BookSchema = new Schema({
    name:String,
    author:String,
    pages:Number,
})

module.exports = mongoose.model("book",BookSchema)