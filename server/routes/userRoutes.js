const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


const { User, validate } = require("../models/user")

const bodyParser = require("body-parser");
router.use(bodyParser.json());
require('dotenv').config();
const Joi = require("joi");





router.get('/home', async (req, res) => {

    res.json({ msg: "halo" });
})



router.post("/register", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ email: req.body.email })
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" })
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/logout', async (req,res)=>{
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
})








module.exports = router;