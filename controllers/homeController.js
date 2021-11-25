const db = require('../models/db.js');
const Product = require('../models/ProductModel.js')

const homeController = {
	home: function(req,res){
		var projection = 'name price _id variation pictures'

		db.findMany(Product, { quantity: { $gt: 0 }}, projection, function(results) {
			if(results != null) {
				res.render('home', {products: results})
			}
		})
		// res.render('home');
	}
}

module.exports = homeController;