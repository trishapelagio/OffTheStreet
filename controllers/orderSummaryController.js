const db = require("../models/db");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");
const Address = require("../models/AddressModel");
const Product = require("../models/ProductModel");

const orderSummaryController = {
	orderSummary: function(req,res){
        var orderId = req.query.id;

        db.findOne(Order, {_id:orderId}, null, function(order) {
            var addressId = order.address;
            
            var details = {
                order: order,
                address: null,
                products: []
            };

            var productOrders = [];
            for(var i = 0; i < order.products.length; i++) {
                var x = {
                    id: order.products[i].product,
                    quantity: order.products[i].quantity
                }
                productOrders.push(x)
            }

            db.findOne(Address, {_id:addressId}, null, function(address) {
                details.address = address;
                
                db.findMany(Product, null, null, function(products) {
                    for(var i = 0; i < productOrders.length; i++) {
                        for(var j = 0; j < products.length; j++) {
                            if(productOrders[i].id == products[j]._id) {
                                var prod = {
                                    product: products[j],
                                    quantity: productOrders[i].quantity
                                }
                                details.products.push(prod);
                            }
                        }
                    }
                    res.render('order-summary', details);
                })
            })
        })
	}
}

module.exports = orderSummaryController;