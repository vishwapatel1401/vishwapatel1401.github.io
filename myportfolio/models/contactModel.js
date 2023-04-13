//Name: Vishwa Patel, Hifza Hameed
//File: contactModel.js
//Date: 13th april, 2023
//Student id:100851337, 100833037
var mongoose = require("mongoose");

var Contact;


// This schema define our contact object. So we can easily add, delete, and udate using this schema

var contactSchema = mongoose.Schema({
  //data structure writing into db

  first_name: String,
  last_name: String,
  phone: String,
  message: String,
  email: {
    required: true,
    type: String,
    collation: { locale: "en"},
  }, 
  contact_created: { type: Date, default: Date.now },
  contact_updated: { type: Date, default: Date.now },
});

if (mongoose.models.contactmodel) {
    Contact = mongoose.model("contactmodel");
} else {
    Contact = mongoose.model("contactmodel", contactSchema);
}



function createContact(userData, result) {
  let userModel = new Contact({
    ...userData,
  });
  userModel.save()
  .then(function (response) {
    result(null, response);
  })
  .catch(function (err) {
    result(err, null);
  });
  
}

function getContact(query, result) {
  // query -> {email:email}
  let projection = { __v: 0}; // Field that will not be return 
  Contact.find(query, projection)
  .then(function (response) {
    result(null, response);
  })
  .catch(function (err) {
    result(err, null);
  });
  
}

function updateContact(query, user, result) {
  
  Contact.findOneAndUpdate(query, { $set: user })
  .then(function (response) {
    result(null, response);
  })
  .catch(function (err) {
    result(err, null);
  });

}

function deleteContact(query,  result) {
  Contact.findOneAndRemove(query)
  .then(function (response) {
    result(null, response);
  })
  .catch(function (err) {
    result(err, null);
  });

}

module.exports = {Contact, createContact, getContact, updateContact, deleteContact};


