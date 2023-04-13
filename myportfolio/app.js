//Name: Vishwa Patel, Hifza Hameed
//File: app.js
//Date: 13th april, 2023
//Student id:100851337, 100833037

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const passport = require('passport');  // authentication
const router = require("./router/index.js");
const mongoose = require("mongoose");
const flash = require('connect-flash');

let passsport_setup = require("./config/passport");

const {session_options, app_const} = require('./constants');


let app = express();

app.use(flash());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(sessions(session_options));
// cookie parser middleware
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// Setup the passsport
passsport_setup(passport);

app.set('view engine', 'ejs');  // We are using ejs as the rendering engine

let port = process.env.PORT || 8080;

app.use(express.static('public'));  // folder to serve our static files


try{
    mongoose.connect('mongodb+srv://nyosasa90:IczvuDvJSmk47LJj@cluster0.zakdiee.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); 
    if (!mongoose.connection) {
        console.log("Error while connecting to MongoDB!")
    }
    else{
        console.log("MongoDB connected!")
    }
}catch(err){
    console.log(err);
}

// Use our router
app.use('/', router);


app.listen(port, function () {
    console.log("Running  on port " + port);
});

