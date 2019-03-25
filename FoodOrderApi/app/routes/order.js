var mongoose = require('mongoose');
var Order = mongoose.model('order');
var router = require('express').Router();

//Get all Orders
router.get('/', (req, res, next) => {
    Order.find({}).populate('user').populate('location').populate('turn').populate('garnish').populate('menu')
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
            res.json({msg: 'No order was found'});
        }, err => {
            if (err) {
                res.status(500).send(err);
            }
        });
});

//Get one Order by idUser and Date
router.get('/:idUser', (req, res, next) => {
    var CurrentDate = new Date();
    CurrentDate.setHours(0, 0, 0, 0);
    Order.findOne({ user: req.params.idUser, date: CurrentDate }).populate('user').populate('location').populate('turn').populate('garnish').populate('menu')
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
            res.json({msg: 'No order was found for that user'});
        }, err => {
            if (err) {
                res.status(500).send(err);
            }
        });
});

//Create Order
router.post('/', (req, res) => {
    const order = new Order({
        menu: req.body.menu,
        mainCourse: req.body.mainCourse,
        garnish: req.body.garnish,
        location: req.body.location,
        turn: req.body.turn,
        user: req.body.user,
        date: req.body.date,
        note: req.body.note
    });
    order.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).json(order);
        }
    });
});

//Update Order
router.put('/:id', async (req, res) => {
    Order.findOneAndUpdate({ _id: req.params.id }, req.body).then(eee => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(eee);
            res.send(eee);
        }
    });
});

module.exports = router;