const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require("body-parser"); 
router.use(bodyParser.json());
require('dotenv').config();

router.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());


passport.use(new LocalStrategy(
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));



router.get('/home', async (req, res) => {

    res.json({ msg: "halo" });
})

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
    async (req, res) => {

        const errors = validationResult(req);
        let err = errors.array();

        if (!errors.isEmpty()) {

            while (err.length < 2) {
                err.push({ msg: "" });

            }

            return res.status(422).json({ errors: err });
        }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user = new User({
                email: req.body.email,
                password: hashedPassword

            })
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            res.status(201).json({ info: "Utworzono uzytkownika" });


        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: err.mesage });

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



  


module.exports = router;