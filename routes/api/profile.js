const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Import Schema for Person from model
const Person = require("../../models/User");

//Import Schema for Profile from model
const Profile = require("../../models/Profile");

//@route    -   GET /api/profile
//desc      -   a route for personal user profile
//access    -   PRIVATE
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(!profile){
                return res.status(400).json({profileNotFoundError: "No Profile Found"})
            } else {
                res.json(profile)
            }
        })
        .catch(err => console.log("Error in Profile " + err))
})

//@route    -   POST /api/profile/
//desc      -   a route for UPDATING/SAVING User Profile
//access    -   PRIVATE
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const profileValues = {};
    profileValues.user = req.user.id;
    if (req.body.username) profileValues.username = req.body.username;
    if (req.body.website) profileValues.website = req.body.website;
    if (req.body.country) profileValues.country = req.body.country;
    if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;
    if (typeof req.body.languages !== undefined) {
        profileValues.languages = req.body.languages.split(",")
    } 

    //Get Social Links
    profileValues.social = {};

    if (req.body.youtube) profileValues.social.youtube = req.body.youtube;
    if (req.body.twitter) profileValues.social.twitter = req.body.twitter;
    if (req.body.instagram) profileValues.social.instagram = req.body.instagram;
    if (req.body.github) profileValues.social.github = req.body.github;

    //Database Handling
    Profile.findOne({ user: req.user.id})
        .then(profile => {
            if(profile){
               Profile.findOneAndUpdate(
                   { user: req.user.id},
                   { $set: profileValues},
                   { new: true}
               ) 
               .then(profile => res.json(profile))
               .catch(err => console.log(" Problem Updating"))
            } else {
                Profile.findOne({ username: profileValues.username})
                    .then(profile => {

                        // Username already Exists
                        if(profile){
                            res.status(400)
                            .json({username: "Username already exists"})
                        } else {
                            new Profile(profileValues).save()
                                .then(profile => res.json(profile))
                                .catch(err => console.log("Error saving updated values"))
                        }
                    })
                    .catch(err => console.log("Username not found"))
            }
        })
        .catch(err => console.log("Problem Fetching Profile " + err))
})

//@route    -   GET /api/profile/:username
//desc      -   a route for getting user profile from username
//access    -   PUBLIC
router.get("/:username", (req, res) => {
    Profile.findOne({username: req.params.username}).populate("user", ['name','profilepic'])
        .then(profile => {
            if(!profile){
                return res.status(404).json({UserNotFound: "User Not Found"});
            } else {
                res.json(profile);
            }
        })
        .catch(err => console.log("Error fetching username from Profile "+ err))
})

//@route    -   GET /api/profile/find/everyone
//desc      -   a route for getting user profile of everyone
//access    -   PUBLIC
router.get("/find/everyone", (req, res) => {
    Profile.find()
    .populate("user", ['name','profilepic'])
        .then(profiles => {
            if(!profiles){
                return res.status(404).json({UserNotFound: "No Profile Found"});
            } else {
                res.json(profiles);
            }
        })
        .catch(err => console.log("Error fetching username from Profile "+ err))
})

//@route    -   DELETE /api/profile/
//desc      -   a route for deleting user based on id
//access    -   PRIVATE
router.delete("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
    Profile.findOneAndRemove({user: req.user.id})
        .then( () => {
            Person.findOneAndRemove({ _id: req.user.id})
                .then( () => res.json({success: "Deletion was successful"}))
                .catch(err => console.log("Error deleting Person " + err))
        })
        .catch(err => console.log("Error deleting User " + err))
})

//@route    -   POST /api/profile/workrole
//desc      -   a route for adding work profile of a person
//access    -   PRIVATE
router.post("/workrole", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id})
        .then(profile => {
            if (!profile) {
                return res.status(400).json({ ProfileNotFound: "Profile Not Found"})
            } else {
                const newWork = {
                    role: req.body.role,
                    company: req.body.company,
                    country: req.body.country,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    details: req.body.details
                }
                profile.workrole.push(newWork)
                profile.save()
                .then(() => res.json(profile))
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log("Failed to fetch user work " + err))
})

//@route    -   DELETE /api/profile/workrole/:id
//desc      -   a route for deleting a specific Workrole
//access    -   PRIVATE
router.delete("/workrole/:w_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then( profile => {
            if(!profile){
                return res.status(400).json({profileNotFound: "Profile Not Found"})
            } else {
                const removeThis = profile.workrole.map(item => item.id).indexOf(req.param.w_id)
                profile.workrole.splice(removeThis, 1)
                profile.save()
                .then((profile) => res.json(profile))
                .catch(err => console.log("Error saving"))
            }
        })
        .catch(err => console.log("Error fetching User"))
})


module.exports = router;

