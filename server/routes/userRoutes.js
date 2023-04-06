const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


router.post('/register',async (req,res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    user = new User({
        email: req.body.email,
        password: hashedPassword
        
    })
    try{
        await user.save()
        res.status(201).json({user})
    }
    catch(err){
        res.status(400).json({error : err.mesage})
    }
})

module.exports = router