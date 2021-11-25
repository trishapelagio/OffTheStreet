const db = require("../models/db");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");

const orderConfirmedController = {
	orderConfirmed: function(req,res){
		var userId = req.session.idUser;

		db.findOne(User, {_id:userId}, null, function(result) {
			var orders = result.orders;

			db.findMany(Order, {_id: orders, status:"Confirmed"}, null, function(results) {
				res.render('order-history-confirmed', {orders: results});
			})
		})
	}
}

module.exports = orderConfirmedController;