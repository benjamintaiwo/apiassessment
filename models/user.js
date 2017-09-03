const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: false
  }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = {
  createUser: (e, user) => {
      const promise = new Promise((resolve, reject) => {
        var userInstance = new UserModel(user);
        userInstance.save((err, result) => {
          if(err) {
            reject(err);
          }
          if(result) {
            resolve(result);
          }
        });
      });

      promise.then((result) => {
        e.emit('createUser', null, result);
      })
      .catch((err) => {
        e.emit('createUser', err, null);
      });
    },

  getUsers: (e) => {
      const promise = new Promise((resolve, reject) => {
        UserModel.find({}, (err, results) => {
          if(err) {
            reject(err);
          }

          if(results) {
            resolve(results);
          }
        });
      });

      promise.then((users) => {
        e.emit('getUsers', null, users);
      })
      .catch((err) => {
        e.emit('getUsers', err, null);
      });
    },

  getUser: (e, userId) => {
      const promise = new Promise((resolve, reject) => {
        UserModel.find({_id: userId}, (err, result) => {
          if(err) {
            reject(err);
          }
      
          if(result) {
            resolve(result);
          }
        });
      });
      promise.then((user) => {
        e.emit('getUser', null, user);
      })
      .catch((err) => {
        e.emit('getUser', err, null);
      });
   },

  updateUser: (e, userId, user) => {
      const promise = new Promise((resolve, reject) => {
        UserModel.update({_id: userId}, {$set: user}, (err, result) => {
          if(err) {
            reject(err);
          }

          if(result) {
            resolve(result);
          }
        });
      });

      promise.then((user) => {
        e.emit('updateUser', null, user);
      })
      .catch((err) => {
        e.emit('updateUser', err, null);
      });

    },


  deleteUser: (e, userId) => {
      const promise = new Promise((resolve, reject) => {
        UserModel.remove({_id: userId}, (err, result) => {
          if(err) {
            reject(err);
          }

          if(result) {
            resolve(result);
          }
        });
      });

      promise.then((user) => {
        e.emit('deleteUser', null, user);
      })
      .catch((err) => {
        e.emit('deleteUser', err, null);
      });

    }
  }









