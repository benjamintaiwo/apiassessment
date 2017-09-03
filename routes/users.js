var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

var EventEmitter = require('events');
var UserModel = require('../models/user.js');

router.post('/', (req, res, next) => {
  var UserEvents = new EventEmitter();
  var user = req.body;
  console.log(user);
  UserEvents.once('createUser', (err, user) => {
    if(err) {
      res.status(500).json({message: 'Could not create user', err: err});
    }

    if(user) {
      res.status(200).json(user);
    }
  });
  UserModel.createUser(UserEvents, user);
});

router.get('/', (req, res, next) => {
  var UserEvents = new EventEmitter();
  UserEvents.once('getUsers', (err, users) => {
    if(err) {
      res.status(500).json({message: 'Could not retrieve users', err: err});
    }

    if(users) {
      res.status(200).json(users);
    }
  });

  UserModel.getUsers(UserEvents);

});

router.get('/:id', (req, res, next) => {
  var UserEvents = new EventEmitter();
  var id = req.params.id;
  UserEvents.once('getUser', (err, user) => {
    if(err) {
      res.status(500).json({message: 'Could not retrieve user', err: err});
    }

    if(user) {
      res.status(200).json(user);
    }
  });

  UserModel.getUser(UserEvents, id);

});

router.put('/:id', (req, res, next) => {
  var UserEvents = new EventEmitter();
  var id = req.params.id;
  var data = req.body;
  UserEvents.once('updateUser', (err, user) => {
    if(err) {
      res.status(500).json({message: 'Could not update user', err: err});
    }

    if(user) {
      res.status(200).json(user);
    }
  });

  UserModel.updateUser(UserEvents, id, data);

});

router.delete('/:id', (req, res, next) => {
  var UserEvents = new EventEmitter();
  var id = req.params.id;
  UserEvents.once('deleteUser', (err, users) => {
    if(err) {
      res.status(500).json({message: 'Could not delete user', err: err});
    }

    if(users) {
      res.status(204).json({});
    }
  });

  UserModel.deleteUser(UserEvents, id);

});


module.exports = router;
