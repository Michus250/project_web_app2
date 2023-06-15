const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { json } = require('body-parser');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    personalId:{
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    workingHours:{
        type: mongoose.Schema.Types.Mixed,
        
    }
    
});
userSchema.methods.addWorkingHours = function () {
    this.workingHours = {
      Monday: { open: '09:00', close: '17:00', isWorking: true },
      Tuesday: { open: '09:00', close: '17:00', isWorking: true },
      Wednesday: { open: '09:00', close: '17:00', isWorking: true },
      Thursday: { open: '09:00', close: '17:00', isWorking: true },
      Friday: { open: '09:00', close: '17:00', isWorking: true },
      Saturday: { open: '09:00', close: '14:00', isWorking: true },
      Sunday: { open: '-', close: '-', isWorking: false }
    };
  };

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role:this.role }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    })
    return token    //ta funkcja jest ze skryptu trzeba sprawdzić czy działa

}
const User = mongoose.model("User", userSchema)

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        role: Joi.required().label("role"),
        phone:Joi.string().regex(/^[0-9]{9}$/).required().label("Phone"),
        personalId:Joi.string().regex(/^[0-9]{11}$/).required().label("personalId"),
        address: Joi.string().required().label("address"),
        dateOfBirth: Joi.date().max('now').required().label("dateOfBirth"),

    })
    return schema.validate(data)
}
module.exports = { User, validate }
