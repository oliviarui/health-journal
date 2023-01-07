// import mongoose from 'mongoose'
const mongoose = require('mongoose')

// define schema
const waterSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    amount: {
        type: Number, 
        required: true
    },
})

const Water = mongoose.model('Water', waterSchema)
module.exports = Water;
