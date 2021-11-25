const db = require("../models/db");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");

const orderPendingController = {
	orderPending: function(req,res){
		var userId = req.session.idUser;

		db.findOne(User, {_id:userId}, null, function(result) {
			var orders = result.orders;

			db.findMany(Order, {_id: orders, status:"Pending"}, null, function(results) {
				res.render('order-history-pending', {orders: results});
			})
		})
	},

	cancel: function(req,res) {
		var userId = req.session.idUser;
		var orderId = req.query.id;
		var date = new Date();
		
		db.updateOne(Order, {_id:orderId}, {status:"Cancelled", timecancelled:date.getTime()})

		res.render('order-history-pending');
	}
}

module.exports = orderPendingController;