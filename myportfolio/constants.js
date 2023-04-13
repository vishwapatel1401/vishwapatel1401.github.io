//Name: Vishwa Patel, Hifza Hameed
//File: contacts.ejs
//Date: 13th april, 2023
//Student id:100851337, 100833037

let constants = {};

const oneDay = 1000 * 60 * 60 * 24;

constants.session_options = {
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
};

// Application constants
constants.app_const = {
  site_name: "My Portfolio",
  site_email: "info@mail.com",
  site_phone: "+142227298",
  site_address: "3A, Waterline, <br> Ontario, Canada"
};

module.exports = constants;

