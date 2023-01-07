// imports
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const path = require('path');
const axios = require('axios');
// import express from 'express';
// import morgan from 'morgan'; 
// import cors from 'cors';
require('dotenv').config(); 

// app
const app = express();
app.use(express.json());

// connect to frontend
app.use(express.static('public'))

// connect to database
const mongoose = require('mongoose');
// import mongoose from 'mongoose'

// previously had db in a different file instead of having all the code here
// import connectDB from './config/db.js'
const connectDB = async () => { 
    try {
        // old connection string that does NOT work
        // const databaseName='Creative Project';
        // `mongodb+srv://admin:admincreativeproj@cluster0.hvrn0nv.mongodb.net/?retryWrites=true&w=majority${databaseName}`
        const con = await mongoose.connect('mongodb+srv://admin:admincreativeproj@cluster0.hvrn0nv.mongodb.net/?retryWrites=true&w=majority', { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
  }
connectDB();

// middleware
app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true})); // used to communicate w frontend


// routes
// communicate with the db
// use postman to act as a client
const User = require('./models/usersModel.js');
const Water = require('./models/waterModel.js');
const Journal = require('./models/journalModel.js');
const Mood = require('./models/moodModel.js');
// const { isModuleNamespaceObject } = require('util/types');
// const { send } = require('process');
// import User from './models/usersModel.js'

// actual code
app.post('/register', async (req, res) => {
    const data = req.body
    // create new user object
    const newUser = {'username':data.username, 'password':data.password}
    // DEBUG
    console.log(newUser)
    // create new user object from user model
    const user = new User(newUser);
    // save new user to db
    await user.save();
     // send message back to client
    res.send({data: user})
})

app.post('/login', async (req, res) => {
    const data = req.body
    // DEBUG
    console.log(data)
    try {
        // get password from database using the username
        const dbResult = await User.find({'username':data.username}) // create query
        const user = dbResult[0]
        // DEBUG
        // console.log(user)
        // check if password matches
        let passMatch = false;
        const dbPass = user.password
        const clientPass = data.password
        //DEBUG
        // console.log(dbPass + ' ' + clientPass)
        // send back true or false
        if(dbPass == clientPass) {
            passMatch = true;
        }
        res.send({success: passMatch, user:user.username})
    } catch {
        //handle error
        res.status(404).send({error:'user not found'})
    }
    
})

app.post('/update-water', async (req, res) => {
    const data = req.body
    const newWaterEntry = {'username':data.username, 'date':data.date, 'amount':data.amount}
    // DEBUG
    // console.log(newWaterEntry)
    const waterEntry = new Water(newWaterEntry)
    await waterEntry.save()
    res.send({data:waterEntry})
})

app.post('/update-mood', async (req, res) => {
    const data = req.body
    const newMoodEntry = {'username':data.username, 'date':data.date, 'moodScale':data.moodScale, 'moodWord':data.moodWord}
    // DEBUG
    console.log(newMoodEntry)
    const moodEntry = new Mood(newMoodEntry)
    await moodEntry.save()
    res.send(moodEntry)
})

app.post('/update-journal', async (req, res) => {
    const data = req.body
    // update streaks
    const streak = data.currentStreak + 1
    const newJournalEntry = {'username':data.username, 'date':data.date, 'content':data.content, 'streak': streak}
    // DEBUG
    // console.log(newJournalEntry)
    const journalEntry = new Journal(newJournalEntry) 
    await journalEntry.save()
    res.send(journalEntry)
})

app.post('/check-streak', async (req, res) => {
    const data = req.body
    let streakValue = 0
    // check if there is a journal entry today
    let dbResult = await Journal.find({'username':data.username,'date':data.today})
    if(dbResult.length == 0) {
        // user has NOT submitted a journal entry today
        // need to check for journal entry from yesterday to determine streak value  
        dbResult = await Journal.find({'username':data.username,'date':data.yesterday})

        if(dbResult.length != 0) {
            const yesterday = dbResult[0]
            streakValue = yesterday.streak
        }
    } else {
        // user has submitted a journal entry today, set streakValue equal to what was stored
        streakValue = dbResult[0].streak
    }
    res.send({streak: streakValue})
})

app.post('/date-query', async (req, res) => { 
    const data = req.body
    const water = await Water.find({'username':data.username,'date':{$gte:data.startDate, $lte: data.endDate}})
    const mood = await Mood.find({'username':data.username,'date':{$gte:data.startDate, $lte: data.endDate}})
    const journal = await Journal.find({'username':data.username,'date':{$gte:data.startDate, $lte: data.endDate}})
    // DEBUG
    // console.log(water)
    res.send({water:water, mood:mood, journal:journal})
})

// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () => console.log("Server is running on port " + port));