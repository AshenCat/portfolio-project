const mongoose = require('mongoose')

requiredString = {
    Type: String,
    required: true
}

let Users = new mongoose.Schema({
    username: requiredString,
    password: requiredString
}, {timestamps:true})