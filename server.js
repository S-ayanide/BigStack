const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

//Bringing Routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/question");

const app = express();
const port = process.env.PORT || 3000;

//Middleware for Express
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//MongoDB Config
const db = require("./setup/settings").mongoURL;

//Attempt to connect to database
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(() => console.log("MonogoDB Connection Error"))

//Passport Middleware
app.use(passport.initialize());

//Config for JWT Strategy
require("./strategies/jsonwtStrategy")(passport);


//@route    -   GET /
//desc      -   Simple Route for HomePage
//access    -   PUBLIC
app.get("/", (req, res) =>{
    res.send("<h1>Hello Big Stack</h1>");
})

//Routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/questions", questions);

app.listen(port, () => console.log(`Server is running at port : ${port}`));