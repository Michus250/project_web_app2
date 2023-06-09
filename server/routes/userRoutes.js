const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const { User, validate } = require("../models/user");
const  ScheduleVisit  = require("../models/sheduleVisit");
const UserExamination = require("../models/usersExamination");

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


router.get("/receptionHours", async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" });
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'Nie znaleziono żadnych lekarzy' });
        }
        return res.json({ doctors });
    } catch (error) {
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});


router.get("/createVisit", async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" });
        const doctors_id = doctors.map(doctor =>{return doctor._id.toString()});
        
        const sheduleVisit = await ScheduleVisit.find({doctor_id:{$in : doctors_id}});
        
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'Nie znaleziono żadnych lekarzy' });
        }
        return res.json({ doctors, sheduleVisit });
    } catch (error) {
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});

router.get("/createVisit"), async (req,res) =>{
   
    try{
        const doctors = await User.find({ role: "doctor" });
        const visits = await ScheduleVisit.find();
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'Nie znaleziono żadnych lekarzy' });
        }
        if(visits.length === 0){
            return res.json({doctors,visits: []});
        }
        
        return res.json({doctors,visits});
    }
    catch (error) {
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
}
router.post("/createVisit", async (req, res) => {
    console.log(req.body);
    try {
        
        const token = jwt.decode(req.body.token);
        console.log(token._id);
        await new ScheduleVisit({ ...req.body, user_id: token._id }).save();
        res.status(201).send({ message: "Visit created successfully" })
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
});

router.get("/userExamination", async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        let decodedToken;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            decodedToken = jwt.decode(token);

        }
        const visits = await ScheduleVisit.find({ user_id: decodedToken._id }).populate('user_id').populate('doctor_id');
        const historyVisits = await UserExamination.find({ user_id: decodedToken._id }).populate('user_id').populate('doctor_id');
        
        if (visits.length === 0 && historyVisits.length === 0) {
            return res.json({ visits: [], historyVisits: [] });
        }
        if (visits.length === 0 && historyVisits.length > 0) {
            return res.json({ visits: [], historyVisits });
        }
        if (visits.length > 0 && historyVisits.length === 0) {
            return res.json({ visits, historyVisits: [] });
        }

        return res.json({ visits, historyVisits });
    } catch (error) {
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
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
router.get('/logout', async (req, res) => {
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
})








module.exports = router;