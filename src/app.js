const express = require('express');
require('./db/mongoose');

const Task = require('./models/task');
const { ObjectId } = require('bson');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();


app.use(express.json());
app.use(userRouter)
app.use(taskRouter);



module.exports = app