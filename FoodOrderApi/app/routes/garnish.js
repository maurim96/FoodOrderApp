var mongoose = require('mongoose');
var Garnish = mongoose.model('garnish');
var router = require('express').Router();

//Get all Garnishes
router.get('/', (req, res, next) => {
    Garnish.find({})
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
            res.json({msg: 'No Garnish was found'});            
        }, err => {
            if (err) {
                res.status(500).send(err);
            }
        });
});

//Get one Garnish by id
router.get('/:id', (req, res, next) => {
    Garnish.findOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        if (result) {
            res.json(result);
        }
        else {
            res.json({msg: 'No Garnish was found'});
        }
    });
});

//Create Garnish
router.post('/', (req, res) => {
    const garnish = new Garnish({
        name: req.body.name,
        img: req.body.img,
        active: req.body.active,
        isSalad: req.body.isSalad
    });
    garnish.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).json(garnish);
        }
    });
});

//Update Garnish
router.put('/:id', async (req, res) => {
    Garnish.findOneAndUpdate({ _id: req.params.id }, req.body).then(eee => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(eee);
            res.send(eee);
        }
    });
});

module.exports = router;