
require('./db/connect');

var 
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    coffeeDrinkRoutes = require('./routes/coffeeDrink'),
    facebookRoutes = require('./routes/facebook'),
    facebook_licenses = require('./routes/facebook_licenses');


app.use(bodyParser.json());
// Routes
app.use(coffeeDrinkRoutes);
app.use(facebookRoutes);
app.use(facebook_licenses);

app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port 8080');
});

exports.app = app;