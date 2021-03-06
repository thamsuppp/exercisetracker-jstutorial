

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// cors middleware
app.use(cors());
app.use(express.json());

// Connect to mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Tell the server to use the routes
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
const studySessionsRouter = require('./routes/studysessions')

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/studysessions', studySessionsRouter);


// This is what starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});