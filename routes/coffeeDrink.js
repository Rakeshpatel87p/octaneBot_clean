var
    express = require('express'),
    app = module.exports = express(),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    CoffeeDrink = require('../models/coffeeDrink');

app.get('/drinkInfo/:drink', function(req, res) {
    CoffeeDrink.findOne({ name: req.params.drink }, function(err, coffeeDrink) {
        if (err) {
            res.status(500).json(err);
        };
        res.status(201).json(coffeeDrink)
    });
});

app.post('/drinkInfo', function(req, res) {
    CoffeeDrink.create({ name: req.body.drinkName, price: req.body.price }, function(err, newDrinkEntry) {
        if (err) {
            res.status(500).json(err)
        };
        res.status(201).json(newDrinkEntry);
    });
});

