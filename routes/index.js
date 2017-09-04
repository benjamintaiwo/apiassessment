const express = require('express');
//const passport = require('passport');
const Account = require('../models/accounts');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const passport = require('../config/passport');

router.get('/', function(req, res) {  
  res.send(`You need to Login! \n\n` +
  `Register first if you do not have an Account.\n` +
  `Register at https://apiassessment.herokuapp.com//register and login at https://apiassessment.herokuapp.com//login.\n\n` +
  `Also, You can perform CRUD operations on a https://apiassessment.herokuapp.com//users schema`);
});

router.post('/register', function(req, res) {  
  if(!req.body.email || !req.body.password) {
    //res.json({ success: false, message: 'Please enter email and password.' });
    res.send(req.body.email);
  } else {
    var newAccount = new Account({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the Account
    newAccount.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new Account.' });
    });
  }
});

router.post('/login', function(req, res) {  
  Account.findOne({
    email: req.body.email
  }, function(err, Account) {
    if (err) throw err;

    if (!Account) {
      res.send({ success: false, message: 'login failed. Account not found.' });
    } else {
      // Check if password matches
      Account.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(Account, config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.status(200).send('HELLO WORLD');
        } else {
          res.send({ success: false, message: 'login failed. Passwords did not match.' });
        }
      });
    }
  });
});





module.exports = router;
