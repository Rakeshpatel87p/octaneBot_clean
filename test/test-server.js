var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = "test";
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

// Testing db
describe('Finding drink info', function(){
	it('should get drink information', function(done){
		chai.request(app)
			.get('/drinkinfo/cortado')
			.end(function(err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.length(3);
                res.body.should.have.property('name');
                res.body.should.have.property('price');
                res.body.should.equal(3)
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Cortado');
                done();
			})
	});

	it('should post new coffee drinks', function(done){
		chai.request(app)
			.post('/drinkInfo')
			.send({'name': 'Tea', 'price': 4})
			.end()
			    should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('price');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Tea');
                res.body.price.should.equal(4);
                res.body.price.should.be.a('number');
                done();
	});
});

describe('Posting to FB API', function(){
	it('should send menu', function(done){
		chai.request(app)
			.post('/webhook')
			.send('order')
			.end()
			
	})
})