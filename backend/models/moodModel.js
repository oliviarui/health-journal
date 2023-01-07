// import mongoose from 'mongoose'
const mongoose = require('mongoose')

// define schema
const moodSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    moodScale: {
        type: Number,
        required: true
    },
    moodWord: {
        type: String, 
        required: false
    }
})

const Mood = mongoose.model('Mood', moodSchema)
module.exports = Mood;
