var mongoose = require('mongoose');
var Menu = mongoose.model('menu');
var router = require('express').Router();

//Get all Menues
router.get('/', (req, res, next) => {
  Menu.find({}).sort({ name: 1 })
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.json({ msg: 'No Menu was found' });
      }
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
      res.json({ msg: 'No Menu was found with this id' });
    }
  });
});

//Create Menu
router.post('/', (req, res) => {
  const menu = new Menu({
    name: req.body.name,
    img: req.body.img,
    type: req.body.type,
    sauce: req.body.sauce,
    active: req.body.active,
    isSalad: req.body.isSalad,
    hasGarnish: req.body.hasGarnish
  });
  menu.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(201).json(menu);
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