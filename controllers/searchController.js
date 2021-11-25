const db = require('../models/db.js');
const Product = require('../models/ProductModel.js')

const searchController = {
	search: function(req,res){
		var input = req.query.searchInput
		var query = {name: {$regex: input, "$options": "i"}, quantity: { $gt: 0 }}

		db.findMany(Product, query, null, function(result) {
			res.render('search', {products: result})
		})
	},

	filter: function(req,res){
		var category = req.query.category
		var query = {category: category, quantity: { $gt: 0 }}

		db.findMany(Product, query, null, function(results) {
			res.render('search', {products: results})
		})
	}
}

module.exports = searchController;