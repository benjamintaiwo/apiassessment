var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Schema defines how the Account data will be stored in MongoDB
var AccountSchema = new mongoose.Schema({  
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Client', 'Manager', 'Admin'],
    default: 'Client'
  }
});

// Saves the Account's password hashed (plain text password storage is not good)
AccountSchema.pre('save', function (next) {  
  var Account = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(Account.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        Account.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
AccountSchema.methods.comparePassword = function(pw, cb) {  
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Account', AccountSchema);