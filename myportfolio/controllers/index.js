//Name: Vishwa Patel, Hifza Hameed
//File: index.js
//Date: 13th april, 2023
//Student id:100851337, 100833037
const validator = require('validator');
const UserModel = require("../models/userModel");
const ContactModel = require("../models/contactModel");
const bcrypt = require("bcrypt");
const passport = require('passport'); 

let Controller = {}

let session;




// SIGN UP CONTROOLER
Controller.signUp = function(req, res){
    let errors = [];
    let email = req.body.email.trim();
    let first_name = req.body.fname.trim();
    let last_name = req.body.lname.trim();
    let username = req.body.username.trim();

    let password = req.body.password;
    let password2 = req.body.password2

    if (email == "") {
        errors.push(['email', "Please provide email address"]);
    } else if(!validator.isEmail(email)) {
        errors.push(['email', "Please provide email address"]);
    }
    if (username == "") {
        errors.push(['username', "Please provide username"]);
    } else if(!username.match(/^[a-zA-Z0-9_]{3,20}$/)) {
        errors.push(['username', "username may only contact aphabets, underscore and number"]);
    }
    if (first_name.length < 3) {
        errors.push(['fname', "Please eneter a valid name"]);
    }
    if (last_name.length < 3) {
        errors.push(['lname', "Please eneter a valid name"]);
    }
    if (password.length < 6) {
        errors.push(['password', "Please enter a valid password; minimum characters should be 6"]);
    } else {
        if (password != password2) {
            errors.push(['password2', "Password not matched"]);
        }
    }
    UserModel.getUser({email}, async function(err, response){
        //console.log(response);
        if(response.length){
            errors.push(['email', "Email address already exist"]);
        }
        // Check for username duplicates
        UserModel.getUser({username}, async function(err, response){
            
            if(response.length){
                errors.push(['username', "Username already exist"]);
            }
            if(errors.length){
                res.send(JSON.stringify(errors));
                return;
            }
            
            // Lets hash the password
            password = await bcrypt.hash(password, 10);
            
            // Create the user now
            UserModel.createUser({username, email, first_name, last_name, password}, function(err, response){
                if(err){
                    res.send("Error: "+ JSON.stringify(err));
                }
                else{
                    res.send("PASS");
                }

            });
        });

    });

}

// LOGIN CONTROOLER
Controller.login = function(req, res, next){
    
    passport.authenticate('local', {
        successRedirect: '/contact-list',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);

}


// CREATE CONTACT CONTROLER
Controller.createContact = function(req, res){
    let errors = [];

    let email = req.body.email.trim();
    let first_name = req.body.first_name.trim();
    let last_name = req.body.last_name.trim();
    let phone = req.body.phone.trim();
    let message = req.body.message.trim();
    
    if (email == "") {
        errors.push(['email', "Please provide email address"]);
    } else if(!validator.isEmail(email)) {
        errors.push(['email', "Please provide email address"]);
    }
    if (first_name.length < 3) {
        errors.push(['first_name', "Name too short"]);
    }
    if (message.length < 12) {
        errors.push(['message', "Message length too short"]);
    }
    if(errors.length){
        res.send(JSON.stringify(errors));
        return;
    }
    
    // Create the contact now
    ContactModel.createContact({email, first_name, last_name, phone, message}, function(err, response){
        if(err){
            res.send("Error: "+ JSON.stringify(err));
        }
        else{
            res.send("PASS");
        }

    });
    
}

// UPDATE CONTACT CONTROLLER
Controller.updateContact = function(req, res){
    let errors = [];

    let id = req.body.id.trim();
    let email = req.body.email.trim();
    let first_name = req.body.first_name.trim();
    let last_name = req.body.last_name.trim();
    let phone = req.body.phone.trim();
    
    message = req.body.message.trim();
    
    if (email == "") {
        errors.push(['email', "Please provide email address"]);
    } else if(!validator.isEmail(email)) {
        errors.push(['email', "Please provide email address"]);
    }
    if (first_name.length < 3) {
        errors.push(['first_name', "Name too short"]);
    }
    if(errors.length){
        res.send(JSON.stringify(errors));
        return;
    }
    let contact_details = {email, first_name, last_name, phone};
    if('message' in req.body){
        contact_details['message'] = req.body.message.trim();
    }

    // Update the contact now
    ContactModel.updateContact({_id: id}, contact_details, function(err, response){
        if(err){
            res.send("Error: "+ JSON.stringify(err));
        }
        else{
            res.send("PASS");
        }

    });
}


// DELETE CONTACT CONTROLLER
Controller.deleteContact = function(req, res){
    let errors = [];

    let id = req.param.id;
   
    // Update the contact now
    ContactModel.deleteContact({_id: id}, function(err, response){
        if(err){
            res.send("Error: "+ JSON.stringify(err));
        }
        else{
            res.send("PASS");
        }
    });
    
}





module.exports = Controller;
