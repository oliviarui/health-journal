// import mongoose from 'mongoose'
const mongoose = require('mongoose')

// define schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
}, 
// {
//     timestamps: true
// }
)

// export schema with the name user
const User = mongoose.model('User', userSchema)
module.exports = User;
// export default User