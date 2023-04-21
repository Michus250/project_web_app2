const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/user');





router.post('/register',
    [
    check('email')
    .isEmail()
    .withMessage('must be a valid email')
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('email already in use');
        }
        return true;
    }),
    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'),
    ],
 async (req,res) =>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
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
});

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