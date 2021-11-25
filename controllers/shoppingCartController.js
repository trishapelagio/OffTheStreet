const session = require("express-session");
const db = require("../models/db");
const ProductModel = require("../models/ProductModel")
const ProductOrdersModel = require("../models/ProductOrdersModel");
const UserModel = require("../models/UserModel");

const shoppingCartController = {

	shoppingCart: function(req,res){
		var userId;
		if(req.session.email){
			userId = req.session.idUser;
		}
		else{
			userId = "5f732730aa6e0c58d0a8f0c1";
		}

		db.findMany(ProductOrdersModel, {user: userId}, null, function(result){
			var ids = [];
			var quantity = [];
			var total = 0;
			var numItems = 0;
			for (var i = 0 ; i<result.length ; i++){
				ids.push(result[i].product);
				quantity.push(result[i].quantity);
			}
			db.findMany(ProductModel, {_id: { $in: ids }}, null, function(results){
				var x = []
				for(var i = 0; i < results.length ; i++){
					for(var j = 0; j< ids.length; j++){
						if(ids[j]==results[i].id) {
							var y = {
								name: results[i].name,
								_id: ids[j],
								quantity: quantity[j],
								price: results[i].price,
								pictures: results[i].pictures,
								max: results[i].quantity
							}
							total += quantity[j] * results[i].price;
							numItems += quantity[j];
							x.push(y)
							j = ids.length
						}
					}
				}
				var z = {
					products: x,
					total: total,
					numItems: numItems
				}
				res.render('shopping-cart', {products: z});
			})
		})
	},

	addToCart: function(req,res) {
		var userId;
		if(req.session.email){
			userId = req.session.idUser;
		}
		else{
			userId = "5f732730aa6e0c58d0a8f0c1";
		}
		
		var productId = req.body.id;

		var newProduct = {
			product: productId,
			user: userId,
			quantity: 1
		}

		db.findOne(ProductOrdersModel, {product: productId, user: userId}, null, function(res) {
			if(res != null) {
				// update quantity
				var quantity = res.quantity + 1;

				db.updateOne(ProductOrdersModel,
					{_id:res._id},
					{quantity: quantity})
			}
			else {
				// create product order
				db.insertOne(ProductOrdersModel, newProduct, function(result) {
					// add to user's cart
				});
			}
		})
	},

	changeQuantity: function(req,res) {
		var userId;
		if(req.session.email){
			userId = req.session.idUser;
		}
		else{
			userId = "5f732730aa6e0c58d0a8f0c1";
		}
		var productId = req.query.id;
		var quantity = req.query.quantity;

		db.updateOne(ProductOrdersModel, {product: productId, user: userId}, {quantity: quantity})

		res.redirect('shopping-cart')
	},

	postDetails: function(req,res) {
		var userId;
		if(req.session.email){
			userId = req.session.idUser;
		}
		else{
			userId = "5f732730aa6e0c58d0a8f0c1";
		}
		var query = {_id: userId}

		db.findOne(UserModel, query, null, function(result) {
			var payment = req.body.payment;
			var delivery = req.body.delivery;
			var total = req.body.total;
			var numItems = req.body.numItems;
			if(req.session.email){
				var details = {
					total: total,
					numItems: numItems,
					modeofpayment: payment,
					modeofdelivery: delivery,
					points: result.points,
					firstname: result.firstname,
					lastname: result.lastname,
					email: result.email
				}
			}
			else{
				var details = {
					total: total,
					numItems: numItems,
					modeofpayment: payment,
					modeofdelivery: delivery,
					points: result.points
				}
			}
			
			res.render('shipping-details', details)

		})
	},

	removeItem: function(req,res) {
		var userId;
		if(req.session.email){
			userId = req.session.idUser;
		}
		else{
			userId = "5f732730aa6e0c58d0a8f0c1";
		}
		var productId = req.query.id;
		db.deleteOne(ProductOrdersModel, {product: productId, user: userId})

		res.redirect('shopping-cart')
	}
}

module.exports = shoppingCartController;