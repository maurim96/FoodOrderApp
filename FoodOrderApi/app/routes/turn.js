var mongoose = require('mongoose');
var Turn = mongoose.model('turn');
var router = require('express').Router();

//Get all Turns
router.get('/', (req, res, next) => {
  Turn.find({})
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.json({ msg: 'No Turn was found' });
      }
    }, err => {
      if (err) {
        res.status(500).send(err);
      }
    });
});

//Get one Turn by id
router.get('/:id', (req, res, next) => {
  Turn.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      res.json(result);
    }
    else {
      res.json({ msg: 'No Turn was found with this id' });
    }
  });
});

//Create Turn
router.post('/', (req, res) => {
  const turn = new Turn({
    name: req.body.name,
    active: req.body.active
  });
  turn.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(201).json(turn);
    }
  });
});

//Update Turn
router.put('/:id', async (req, res) => {
  Turn.findOneAndUpdate({ _id: req.params.id }, req.body).then(eee => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(eee);
      res.send(eee);
    }
  });
});

module.exports = router;