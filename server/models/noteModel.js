const mongoose = require('mongoose')

const Schema = mongoose.Schema
const noteSchema = new Schema({
    authorname: String,
    content : String ,
    date : String
})

module.exports= mongoose.model('note', noteSchema, 'notes')