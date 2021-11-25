const db = require("../models/db");
const Order = require("../models/OrderModel")
const User = require("../models/UserModel")

const adminOrderController = {
	adminOrder: function(req,res){
		if(req.session.type=="admin"){
			db.findMany(Order, null, null, function(orders) {
				var x = orders
				var num = [];
				for(var i = 1; i <= orders.length; i++)
					num.push(i)
				
				// get user from each order
				for(var i = 0; i < x.length; i++) {
					orderId = x[i]._id
				}
	
				db.findMany(User, null, null, function(results) {
					for(var i = 0; i < x.length; i++) {
						for(var j = 0; j < results.length; j++) {
							if(results[j].orders.includes(x[i]._id)) {
								x[i].name = results[j].firstname + " " + results[j].lastname
								x[i].quantity = num[i]
							}
						}
					}
					res.render('admin-order-page', {orders: x});
				})
			})
		}
		else{
			res.redirect('/')
		}
	},

	changeStatus: function(req,res) {
		var id = req.body.id
		var status = req.body.status
		var date = new Date();
		var time = date.getTime();

		db.updateOne(Order, {_id: id}, {status: status})

		if(status == "Completed")
			db.updateOne(Order, {_id:id}, {timecompleted:time})
		if(status == "Cancelled")
			db.updateOne(Order, {_id:id}, {timecancelled:time})
		if(status == "Confirmed"){
			db.updateOne(Order, {_id:id}, {timeconfirmed:time})
			db.findOne(User, {orders: id}, null, function(user){
				db.findOne(Order, {_id: id},null, function(order){
					db.updateOne(User, {_id:user._id}, {$inc: {points: order.total/100}})
				})
			})
		}
	}
}

module.exports = adminOrderController;