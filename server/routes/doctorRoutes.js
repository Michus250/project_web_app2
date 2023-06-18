const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const ScheduleVisit = require("../models/sheduleVisit");
const Examination = require("../models/examination");
const UserExamination = require("../models/usersExamination");
const { default: mongoose } = require('mongoose');

router.get("/endExamination", async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        let decodedToken;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            decodedToken = jwt.decode(token);

        }
        const visits = await ScheduleVisit.find({ doctor_id: decodedToken._id }).populate('user_id');
        const examinations = await Examination.find({})
        if (visits.length === 0) {
            return res.json({ visits: [] });
        }

        return res.json({ visits, examinations });
    } catch (error) {
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});
router.post("/endExamination", async (req, res) => {
    try {
        const examinationIds = req.body.examinations;
        
        

     
          

        const existingExaminations = await Examination.find({ _id: { $in: examinationIds } });
        
        const result = existingExaminations.map(e => parseFloat(e.price.toString())).reduce((acc,val)=> acc + val, 0);
        
        price = mongoose.Types.Decimal128.fromString(result.toString());
        
        
        const visit = await ScheduleVisit.findOne({ _id: req.body.visitId });
       
        if (!visit) {
            return res.status(404).json({ message: "Visit not found" });
        }
        
        
        
        await new UserExamination({
            user_id: visit.user_id,
            doctor_id: visit.doctor_id,
            name: req.body.name,
            date: visit.date,
            description: req.body.description,
            price: price
        }).save();
        
        await visit.deleteOne({});

        res.json({ message: "Success" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/changeHours", async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        let decodedToken;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            decodedToken = jwt.decode(token);

        }
        const doctor = await User.findOne({ _id: decodedToken._id });
        

        return res.json({ doctor });
    } catch (error) {
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});

router.put("/changeHours", async (req, res) => {
    try {

        await User.findByIdAndUpdate(req.body._id,req.body,{new:true});

        return res.json({ message:"Zaktualizowano" });
    } catch (error) {
        return res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});




module.exports = router;