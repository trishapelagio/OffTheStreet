const db = require('../models/db.js');
const Product = require('../models/ProductModel.js')

const productDetailsController = {
	productDetails: function(req,res){
		var productId = req.query.id; 
		var query = {_id: productId};
		var projection = 'name description color price variation pictures';
		
		db.findOne(Product, query , projection, function(result) {
			res.render('product-details', result);
		});
	}
}

module.exports = productDetailsController;