//Name: Vishwa Patel, Hifza Hameed
//File: auth.js
//Date: 13th april, 2023
//Student id:100851337, 100833037

module.exports = {
  AuthGuard: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'Please log in to view that resource');
    res.redirect('/login');
  },
  nAuthGuard: function(req, res, next) {  // Reverse login
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');      
  }
};
