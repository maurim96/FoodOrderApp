var mongoose = require('mongoose');
var Location = mongoose.model('location');
var router = require('express').Router();

//Get all Locations
router.get('/', (req, res, next) => {
  Location.find({})
    .then(result => {
      if (result) {
        res.status(200).json(result);
      }
      res.json({msg: 'No Location was found'});      
    }, err => {
      if (err) {
        res.status(500).send(err);
      }
    });
});

//Get one Location by id
router.get('/:id', (req, res, next) => {
  Location.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      res.json(result);
    }
    else {
      res.json({msg: 'No Location was found with this id'});
    }
  });
});

//Create Location
router.post('/', (req, res) => {
  const location = new Location({
    name: req.body.name,
    active: req.body.active
  });
  location.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(201).json(location);
    }
  });
});

//Update Location
router.put('/:id', async (req, res) => {
  Location.findOneAndUpdate({ _id: req.params.id }, req.body).then(eee => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(eee);
      res.send(eee);
    }
  });
});

module.exports = router;