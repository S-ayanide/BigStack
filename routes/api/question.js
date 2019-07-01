const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Import Schema for Person from model
const Person = require("../../models/User");

//Import Schema for Profile from model
const Profile = require("../../models/Profile");

//Import Schema for Profile from model
const Question = require("../../models/Question");

//@route    -   GET /api/questions
//desc      -   a route for users to ask questions
//access    -   PUBLIC
router.get("/", (req, res) => {
    Question.find()
        .sort({date: "desc"})
        .then(question => res.json(question))
        .catch(err => res.json({ noquestions: "There are no questions"}))
});

//@route    -   POST /api/questions
//desc      -   a route for users to ask questions
//access    -   PRIVATE
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const newQuestion = new Question({
        textone: req.body.textone,
        texttwo: req.body.texttwo,
        user: req.user.id,
        name: req.body.name
    });
    newQuestion.save()
    .then((question) => res.json(question))
    .catch(err => console.log("Error adding Questions"))
})


//@route    -   POST /api/answers/:id
//desc      -   a route for users to answer questions
//access    -   PRIVATE
router.post("/answers/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Question.findById(req.params.id)
        .then(question => {
            if(question) {
                const newAnswer = {
                    user: req.user.id,
                    text: req.body.text,
                    name: req.body.name
                }
                question.answers.push(newAnswer)
                question.save()
                .then(question => res.json(question))
                .catch(err => console.log("Problem saving new Answers"))
            }
        })
        .catch(err => console.log("Error fetching asnwers"))
})

//@route    -   POST /api/questions/upvote/:id
//desc      -   a route for upvoting
//access    -   PRIVATE
router.post("/upvote/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id})
        .then(profile => {
            Question.findById(req.params.id)
            .then(question => {
                if (question.upvotes.filter(upvote => upvote.user.toString() === req.user.id.toString()).length > 0) {
                    return res.status(400).json({noupvote: "User has already upvoted"})
                } else {
                    question.upvotes.unshift({user: req.user.id})
                    question.save()
                    .then(question => res.json(question))
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log("Problem fetching ID " + err))
        })
        .catch(err => console.log("Problem Finding user"))
})


module.exports = router;
