var
	express = require('express'),
	app = module.exports = express(),
	Privacy_Policy = require('../facebook_license_agreements/privacy_policy'),
	Terms_and_Conditions = require('../facebook_license_agreements/Terms_and_Conditions');


app.get('/facebook_licenses/privacypolicy', function(req, res) {
    res.send(Privacy_Policy);
});

app.get('/facebook_licenses/terms_and_conditions', function(req, res) {
    res.send(Terms_and_Conditions);
});