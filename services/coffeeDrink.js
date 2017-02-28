Request = require('request');

// Facebook token for messenger API:
var token = "EAALR6yLCTuoBALKsjMzUnGMnmxV5jfSvJY3l1XAUbNYA7Mgl31TFAvT9QEkXxy0uklBPyeWdLFroZBf6hdTXX1ZBYPKCSUaTdDHdnxhpaaRhpCk50kvMzDVOZBCHzgO6IzXXq6JC1OX7aZBIn0xHFH8nydrFe5rU7pvGjZCs6tQZDZD";

exports.greetingMessage = function(sender) {
    var messageData = {
        greeting: {
            "text": "Hi {{user_first_name}}, welcome to this bot."
        }
    }
    Request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
};

exports.sendTextMessage = function(sender, text) {
    var messageData = { text: text }
    Request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
};

exports.sendMenuMessage = function(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "House Coffee",
                        "subtitle": "Freshly brewed, brought to you from la montanas de Honduras. $3.00",
                        "image_url": "http://wtop.com/wp-content/uploads/2015/03/getty_030315_coffee.jpg",
                        "buttons": [{
                            "type": "postback",
                            "title": "Order Me!",
                            "payload": "House_Coffee"

                        }],
                    },

                    {
                        "title": "Cappuccino",
                        "subtitle": "Italian Coffee drink, prepared with 2 shots of espresso, hot milk, and steamed milk foam. (Let drooling commence) $4.00.",
                        "image_url": "http://del.h-cdn.co/assets/15/45/980x490/landscape-1446486666-giulia-mule.jpg",
                        "buttons": [{
                            "type": "postback",
                            "title": "No, Pick Me!",
                            "payload": "Cappuccino"

                        }],
                    },

                    {
                        "title": "Cortado",
                        "subtitle": "Equal parts espresso and steamed milk. 5 ounches total volume. We got you! $3.00",
                        "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/16/Caf%C3%A9Cortado(Tallat).jpg",
                        "buttons": [{
                            "type": "postback",
                            "title": "Here Here!",
                            "payload": "Cortado",

                        }],
                    }, {
                        "title": "In Limited Release",
                        "subtitle": "If we dont have your drink, you'll have to use our beautiful register",
                        "buttons": [{
                            "type": "postback",
                            "title": "Click If You Want This Option!",
                            "payload": "Other users"
                        }],
                    }
                ]
            }
        }
    };

    Request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

exports.orderSummaryMessage = function(sender, coffeeDrink) {
    console.log('coffeeDrink', coffeeDrink)
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": coffeeDrink.name + ' order. For $' + coffeeDrink.price,
                    "subtitle": "To start fresh, type 'order'",
                    "buttons": [{
                        "type": "postback",
                        "title": "Confirm",
                        "payload": 'confirmed ' + coffeeDrink.name
                    }]
                }]
            }
        }
    };
    Request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

exports.sendConfirmation = function(sender, coffeeDrinkConfirmed) {
    var messageData = { text: coffeeDrinkConfirmed + " Have a seat! We'll bring your drink out." }
    Request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
};