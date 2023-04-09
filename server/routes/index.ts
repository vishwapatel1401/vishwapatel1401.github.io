import express from 'express';
const router = express.Router();
import Contact from '../models/contact';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page : "home", displayName : "" });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page : "home", displayName : "" });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About us', page : "about", displayName : "" });
});

router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products', page : "products", displayName : "" });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', page : "services", displayName : "" });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact us', page : "contact", displayName : "" });
});

router.get('/add', function(req, res, next) {
  res.render('index', { title: 'Add Contact', page : "edit", contact :  '' ,displayName : "" });
});

router.post('/add', function(req, res, next) {

  let newContact = new Contact(
      {
        "FullName" : req.body.fullName,
        "ContactNumber" : req.body.contactNumber,
        "EmailAddress" : req.body.emailAddress,
      }
  );

  Contact.create(newContact).then(function (contactToEdit) {

    res.redirect('/contact-list');

  }).catch(function(err){
    console.error("Failed to add contact" +err);
    res.end(err);

  });

});

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id

  Contact.deleteOne({_id : id}).then(function (contactEdit) {
    res.redirect('/contact-list');

  }).catch(function(err){
    console.error("Failed to delete contact from database" +err);
    res.end()

  });

});


router.get('/contact-list', function(req, res, next) {
  Contact.find().then(function(data){
    res.render('index', { title: 'Contact List', page : "contact-list", contact: data,displayName : "" });
    //console.log(data);
  }).catch(function(err){
    console.error("Encountered an error reading from the database: ");
  })

});

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id

  Contact.findById(id).then(function (contactEdit) {

    res.render('index', { title: 'Edit', page : "edit",
                                    contact: contactEdit,displayName : "" });

  }).catch(function(err){
    console.error("Failed to retrieve contact from database" +err);
    res.end()

  });

});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id
  let updatedContact = new Contact(
      {
        "_id" : id,
        "FullName" : req.body.fullName,
        "ContactNumber" : req.body.contactNumber,
        "EmailAddress" : req.body.emailAddress,
      }
);

  Contact.updateOne({_id : id}, updatedContact).then(function (contactToEdit) {

    res.redirect('/contact-list');

    res.render('index', { title: 'Edit', page : "edit",
      contact: contactToEdit,displayName : "" });

  }).catch(function(err){
    console.error("Failed to edit contact from database" +err);
    res.end(err);

  });

});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page : "login", displayName : "" });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page : "register", displayName : "" });
});
export default router;
