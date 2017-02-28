var 
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,

var CoffeeDrinkSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    price: { type: Number },
});

var CoffeeDrink = mongoose.model('CoffeeDrink', CoffeeDrinkSchema);

module.exports = CoffeeDrink;