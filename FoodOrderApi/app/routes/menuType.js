var mongoose = require('mongoose');
var MenuType = mongoose.model('menuType');
var router = require('express').Router();

//Get all MenuTypes
router.get('/', (req, res, next) => {
  MenuType.find({}).populate('ingredients')
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

//Get one MenuType by id
router.get('/:id', (req, res, next) => {
  MenuType.findOne({_id: req.params.id}, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } 
      if(result) {
        res.json(result);
      } 
      else {
        res.send("No MenuType was found with this id!");
      } 
    });
});

//Create MenuType
router.post('/', (req, res) => {
  const menuType = new MenuType({
    name: req.body.name,
    isSalad: req.body.isSalad,
    ingredients: req.body.ingredients
  });
  menuType.save((err) => {
    if (err) {
      res.status(500).send(err);
    } 
    else {
      res.send(menuType);
    }
  });
});

//Update MenuType
router.put('/:id', async (req, res) => {
  MenuType.findOneAndUpdate({_id: req.params.id}, req.body).then(eee => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(eee);
      res.send(eee);
    }    
  });  
});

module.exports = router;