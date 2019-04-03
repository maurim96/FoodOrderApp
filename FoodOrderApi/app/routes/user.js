var mongoose = require('mongoose');
var User = mongoose.model('user');
var router = require('express').Router();

//Get all Users
router.get('/', (req, res, next) => {
  User.find({})
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.json({ msg: 'No User was found' });
      }
    }, err => {
      if (err) {
        res.status(500).send(err);
      }
    });
});

//Login User by UserName and Password
router.post('/login', (req, res) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password
  };
  User.findOne({ username: loginData.username, password: loginData.password }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      res.status(200).json(result);
    }
    else {
      res.status(500).send({
        msg: "Incorrect Username/Password."
      });
    }
  });
});

//Get one User by id
router.get('/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      res.json(result);
    }
    else {
      res.json({ msg: 'No User was found with this id' });
    }
  });
});

//Create User
router.post('/', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    active: req.body.active
  });
  user.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(201).json(user);
    }
  });
});

//Update User
router.put('/:id', async (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body).then(eee => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(eee);
    }
  });
});

module.exports = router;