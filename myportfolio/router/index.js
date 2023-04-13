//Name: Vishwa Patel, Hifza Hameed
//File: index.js
//Date: 13th april, 2023
//Student id:100851337, 100833037
// User must be login in order to access this page

const { app_const } = require("../constants");
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/UserModel");
const { AuthGuard, nAuthGuard } = require("../config/auth");
const validator = require("validator");
const router = express.Router();

const Controller = require("../controllers/index");

// Display  home page
router.get("/", function (req, res) {
  session = req.session;
  //	console.log(session);
  res.render("index", { app_const, session });
});
// Display  About Me page
router.get("/about-me", function (req, res) {
  session = req.session;
  res.render("about-me", { app_const, session });
});
// Display  Projects page
router.get("/projects", function (req, res) {
  session = req.session;
  res.render("projects", { app_const, session });
});
// Display  Service page
router.get("/services", function (req, res) {
  session = req.session;
  res.render("services", { app_const, session });
});

// Display  Contact us page
router.get("/contact-me", function (req, res) {
  session = req.session;
  res.render("contact-me", { app_const, session });
});

// Handle Contact Us form submission
router.post("/contact-me", Controller.createContact);

// Display  Signup page
router.get("/sign-up", nAuthGuard, function (req, res) {
  session = req.session;
  res.render("sign-up", { app_const, session });
});

// Handle user  sign up data
router.post("/sign-up", nAuthGuard, Controller.signUp);

// Display  Login page
router.get("/login", nAuthGuard, function (req, res) {
  session = req.session;
  res.render("login", {
    app_const,
    session,
    flash_message: req.flash("error"),
  });
});

// Handle user  Login Request
router.post("/login", nAuthGuard, Controller.login);

// Handle user  Logout Request
router.get("/logout", function (req, res) {
  if (req.session) {
    req.session.destroy();
  }
  res.redirect("/");
});



// Display  Contact List Page page
router.get("/contact-list", AuthGuard, function (req, res) {
  session = req.session;
  res.send("/contact-list");
  //res.render("contact-list", {app_const, session});
});





module.exports = router;
