const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const mongoose = require("mongoose");
const key = require("../../setup/settings");
const router = express.Router();


//@route    -   GET /api/auth
//desc      -   a simple route to test auth.js
//access    -   PUBLIC
router.get("/", (req, res) => {
    res.json({
        test: "Auth is success"
    })
})

//Import Schema for Person from model
const Person = require("../../models/User");

//@route    -   POST /api/auth/register
//desc      -   route to register users
//access    -   PUBLIC
router.post("/register", (req, res) => {

    Person.findOne({email: req.body.email})
        .then(person => {
            if (person) {
                return res.status(400)
                .json({emailerror: "Email is already Registered"});
            } else {
                const newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender
                });

                if(newPerson.gender == 'female'){
                    newPerson.profilepic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbooLLQWicbjO4XEYlSpMt6zjXN8B4L6cC04byZXQCjQRitSYh";
                }
                // Encrypt password using bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPerson.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if (err) {
                            throw err;
                        } else {
                            newPerson.password = hash;
                            newPerson.save()
                            .then(person => res.json(person))
                            .catch(err => console.log(err));
                        }
                    });
                });
            }
        })
        .catch(err => console.log(err))
})

//@route    -   POST /api/auth/login
//desc      -   route to login users
//access    -   PUBLIC
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Person.findOne({email})
        .then(person => {
            if(!person){
                return res.status(404).json({emailerror: "User not Found with this email"});
            }
            bcrypt.compare(password, person.password)
                // isCorrect is a boolean Object which will return true if credentials are correct
                .then(isCorrect => {
                    if(isCorrect){
                        // Will return True if email and password provided are matched with database
                        //res.json({success: "User logged in Successfully"})
                        //Use payload and create token for user
                        const payload = {
                            id: person.id,
                            name: person.name,
                            email: person.email,
                            gender: person.gender
                        }
                        jsonwt.sign(
                            payload,
                            key.secret,
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err){
                                    res.json({
                                        success: false
                                    });
                                } else {
                                    res.json({
                                        success: true,
                                        token: "Bearer "+token
                                    });
                                }
                            }
                        )
                    } else {
                        // Will return False if email and password provided are not matched with database
                        res.status(400).json({passworderror: "Password is not correct"})
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

})

//@route    -   POST /api/auth/profile
//desc      -   route to profile for each user
//access    -   PRIVATE
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            gender: req.user.gender
        })
    }
);

module.exports = router;