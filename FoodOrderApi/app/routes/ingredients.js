var mongoose = require('mongoose');
var Ingredients = mongoose.model('ingredients');
var router = require('express').Router();

//Get all Ingredients
router.get('/', (req, res, next) => {
  Ingredients.find({})
    .then(result => {
      if (result) {
        res.status(200).json(result);
      }
      res.json({msg: 'No Ingredients was found'});      
    }, err => {
      if (err) {
        res.status(500).send(err);
      }
    });
});

//Get one Ingredient by id
router.get('/:id', (req, res, next) => {
  Ingredients.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      res.json(result);
    }
    else {
      res.json({msg: 'No Ingredients was found with this id'});
    }
  });
});

//Create Ingredients
router.post('/', (req, res) => {
  const ingredient = new Ingredients({
    name: req.body.name,
    active: req.body.active,
    isSpecial: req.body.isSpecial
  });
  ingredient.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(201).json(ingredient);      
    }
  });
});

//Update Ingredients
router.put('/:id', async (req, res) => {
  Ingredients.findOneAndUpdate({ _id: req.params.id }, req.body).then(eee => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(eee);
      res.send(eee);
    }
  });
});

module.exports = router;