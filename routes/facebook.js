var 
    express = require('express'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    app = module.exports = express(),
    CoffeeDrink = require('../models/coffeeDrink'),
    CoffeeDrinkServices = require('../services/coffeeDrink');

// for facebook verification
app.get('/webhook', function(req, res) {

    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token');
    CoffeeDrinkServices.sendMenuMessage();
});

app.post('/facebookCanvasPost/', function(req, res) {
    res.send({});
})

// to post data
app.post('/webhook', function(req, res) {
    var messaging_events = req.body.entry[0].messaging;
    console.log(req.body.entry)
    for (var i = 0; i < messaging_events.length; i++) {
        var event = messaging_events[i];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text
            if (text == 'order') {
                CoffeeDrinkServices.sendMenuMessage(sender)
                continue
            }
        }
        if (event.postback) {
            // var postbackText = JSON.stringify(event.postback.payload)
            CoffeeDrink.findOne({ name: event.postback.payload }, function(err, coffeeDrink) {
                    if (err) {
                        console.log(err)
                    }
                    if (!coffeeDrink) {
                        CoffeeDrinkServices.sendConfirmation(sender, event.postback.payload)
                    } else {
                        CoffeeDrinkServices.orderSummaryMessage(sender, coffeeDrink);
                    }

                })
        }
    }
    res.sendStatus(200)
});