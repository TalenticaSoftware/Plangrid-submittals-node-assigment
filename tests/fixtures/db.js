const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const { response } = require('express');
const Task = require('../../src/models/task');

const userOneId= new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@cc.com',
    password: "Resentest6358U",
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

const userTwoId= new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Ram',
    email: 'ram@cc.com',
    password: "Resentest6358U@",
    tokens:[{
        token: jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First task",
    completed : false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task",
    completed : true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "third task",
    completed : true,
    owner: userTwoId
}


const setupDB = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();  
}

module.exports = {
    userOne,
    userOneId,
    setupDB,
    userTwo,
    userTwoId,
    taskOne,
    taskThree
}