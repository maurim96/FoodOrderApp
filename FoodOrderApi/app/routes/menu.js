var mongoose = require('mongoose');
var Menu = mongoose.model('menu');
var router = require('express').Router();

//Get all Menues
router.get('/', (req, res, next) => {
  Menu.find({}).populate('menuType')
    .then(result => {
      if (result) {
        res.status(200).json(result);
      }
      res.send("No Menu was found!");
    }, err => {
      if (err) {
        res.status(500).send(err);
      }
    });
});

//Get one Menu by id
router.get('/:id', (req, res, next) => {
  Menu.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      res.json(result);
    }
    else {
      res.send("No Menu was found with this id!");
    }
  });
});

//Create Menu
router.post('/', (req, res) => {
  const menu = new Menu({
    name: req.body.name,
    isSecondary: req.body.isSecondary,
    menuType: req.body.menuTypes
  });
  menu.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send(menu);
    }
  });
});

//Update Menu
router.put('/:id', async (req, res) => {
  Menu.findOneAndUpdate({ _id: req.params.id }, req.body).then(eee => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(eee);
      res.send(eee);
    }
  });
});

module.exports = router;