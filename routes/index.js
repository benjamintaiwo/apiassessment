const express = require('express');
//const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

require('../config/passport')(passport);

app.get('/', function(req, res) {  
  res.send('You need to Login, Register first if you do not have an Account.Register at /register and login at /login');
});

router.post('/register', function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
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
