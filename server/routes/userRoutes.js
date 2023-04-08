const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


router.post('/register',async (req,res) =>{
    try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = new User({
        email: req.body.email,
        password: hashedPassword
        
    })
    
        await user.save();
        res.status(201).json({user});
    }
    catch(err){
        res.status(400).json({error : err.mesage});
    }
})
router.get('/users', async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router;