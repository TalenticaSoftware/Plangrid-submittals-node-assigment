const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');
const { query } = require('express');

router.get('/tasks',auth, async (req,res)=>{
   let sort = {};
   if(req.query.sortBy){
       const sortQuery = req.query.sortBy.split(":");
       sort = {
           [sortQuery[0]]: sortQuery[1]===  'desc' ? -1 : 1
       }
   }
    try {
        const tasks = await Task.find({ owner: req.user._id}).limit(parseInt(req.query.limit)).skip(req.query.skip).sort(sort);
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
    })
    
    router.get('/tasks/:id',auth,async(req,res)=>{
        const _id = req.params.id;
    try {
    const task = await Task.findOne({_id, owner: req.user._id.toString()})
    if(!task){
        res.status(404).send();
    }
    res.send(task);
    }catch(e){
    res.status(500).send(e)
    }
    })
    

router.post('/tasks',auth, async (req,res)=>{
   const task = new Task({
       ...req.body,
       owner : req.user._id
   })
    
    try {
        await task.save();
        res.status(201).send(task)
    }catch(e) {
        res.status(400).send(e);
    }
    })

    router.patch('/tasks/:id',auth,async(req,res)=>{
        const updates = Object.keys(req.body);
        const allowed = ['description','completed','age'];
        const isValidUpdation = updates.every(update => allowed.includes(update));

       const _id = req.params.id;
       if(!isValidUpdation){
           return res.status(400).send({error: 'invalid updates'})
       }
   
       try{

        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        updates.forEach(up =>task[up]=req.body[up]);
        await task.save();
               
        if(!task){
                   res.status(404).send()
               }
               res.send(task)
       }catch(e){
         res.status(500).send(e)  
       }
   
        })


        router.delete('/tasks/:id', auth,async (req,res)=> {
            try {
                const user = await Task.findOneAndDelete({_id:req.params.id,onwer: req.user._id});
        
                if(!user){
                    return res.status(404).send()
                }
                res.send(user)
            }catch(e){
                res.status(500).send(e);
            }
        })
module.exports = router