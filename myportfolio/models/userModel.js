//Name: Vishwa Patel, Hifza Hameed
//File: userModel.js
//Date: 13th april, 2023
//Student id:100851337, 100833037
var mongoose = require("mongoose");

var User;


// This schema define our contact object. So we can easily add, delete, and udate using this schema

var userSchema = mongoose.Schema({
  //data structure writing into db

  first_name: String,
  last_name: String,
  password: String,
  username: {
    required: true,
    type: String,
    unique: true,
    index: true,
    collation: { locale: "en", strength: 2 },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    index: true,
    collation: { locale: "en", strength: 2 },
  }, // Email should be unique
  account_created: { type: Date, default: Date.now },
  account_updated: { type: Date, default: Date.now },
});

if (mongoose.models.usermodel) {
    User = mongoose.model("usermodel");
} else {
    User = mongoose.model("usermodel", userSchema);
}



async function createUser(userData, result) {
  let userModel = new User({
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

function getUser(query, result) {
  // query -> {email:email} or {username:username}
  let projection = { __v: 0}; // Field that will not be return
  
  User.find(query, projection)
  .then(function (response) {
    result(null, response);
  })
  .catch(function (err) {
    result(err, null);
  });
  
  
}

function checkEmail(email, result) {
  let projection = { __v: 0, _id: 0 }; // Field that will not be return
  User.find({ email: email }, projection, function (err, response) {
    if (err) result(err, response);
    else result(null, response);
  });
}

function updateUser(query, user, result) {
  
  User.findOneAndUpdate(query, { $set: user })
  .then(function (response) {
    result(null, response);
  })
  .catch(function (err) {
    result(err, null);
  });

}

module.exports = {User, createUser, getUser, checkEmail, updateUser };


