// import mongoose from 'mongoose'
const mongoose = require('mongoose')

// define schema
const journalSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    streak: {
        type: Number
    }
})

const Journal = mongoose.model('Journal', journalSchema)
module.exports = Journal;
