const db = require('../models/db.js');
const Product = require('../models/ProductModel.js')

const adminProductController = {
	adminProduct: function(req,res){
		if(req.session.type=="admin"){
			db.findMany(Product, null, null, function(results) {
				products = results;
				for(var i=0 ; i<results.length ; i++){
					products[i].number = i+1;
				}
				if(results != null) {
					res.render('admin-product-page', {products: products})
				}
			})
		}
		else{
			res.redirect('/')
		}	
	},

	addProduct: function(req,res){
		if(req.file != null)
			var profilePic =  'uploads/'+req.file.filename;
		var name = req.body.name;
		var description = req.body.description;
		var color = req.body.color;
		var pictures = profilePic;
		var date = new Date();
		var postingdate = date.getTime();
		var price = req.body.price;
		var category = req.body.category;
		var variation = req.body.variation;
		var quantity = req.body.quantity;

		var fullproduct = {
			name: name,
			description: description,
			color: color,
			pictures: pictures,
			postingdate: postingdate,
			price: price,
			category: category,
			variation: variation,
			quantity: quantity
		}
		db.insertOne(Product, fullproduct, function(){
		})
		res.redirect('/adminProduct')
	},
	
	deleteProduct: function(req,res){
		var productId = req.query.id
		db.deleteOne(Product, {_id:productId})
	},

	editProduct: function(req,res){
		if(req.file != null)
			var profilePic =  'uploads/'+req.file.filename;
		else
			var profilePic = req.body.prevpic;
		var id = req.body.id
		var name = req.body.name;
		var description = req.body.description;
		var color = req.body.color;
		var pictures = profilePic;
		var price = req.body.price;
		var category = req.body.category;
		var variation = req.body.variation;
		var quantity = req.body.quantity;

		/**var fullproduct = {
			name: name,
			description: description,
			color: color,
			pictures: pictures,
			postingdate: postingdate,
			price: price,
			category: category,
			variation: variation,
			quantity: quantity
		}**/
		var product = {
			name: name,
			description: description,
			color: color,
			pictures: pictures,
			price: price,
			category: category,
			variation: variation,
			quantity: quantity
		}

		db.updateOne(Product, {_id:id}, product)
		
		res.redirect('/adminProduct')
	}
}

module.exports = adminProductController;