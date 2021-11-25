const db = require("../models/db");
const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt')
const saltRounds = 10;

const loginController = {
	login: function(req,res){
		res.render('login');
	},

	postLogin: function (req, res) {
		var query = {email: req.body.email};
		var password = req.body.password;

		var projection = null;

		db.findOne(UserModel, query, projection, function (result){
			if(result != null){
				bcrypt.compare(password, result.password, function(err, equal) {
					if(equal){
						req.session.email = req.body.email;
						req.session.firstname = result.firstname;
						req.session.idUser = result._id;
						req.session.type = result.type;
						if(result.type=='admin')
							res.redirect('/adminHome');
						else{
							res.redirect('/');
						}
					}
                    else {
                    }

                });	
			}
			else {
			}
		})
	},

	getCheckID: function(req, res) {
		var email = req.query.email;
		db.findOne(UserModel, {email:email}, 'username', function(result) {
			res.send(result);
		}) 
	},

	getCheckLogin: function(req, res) {
		var query = {email: req.query.email};
		var password = req.query.password
		var projection = null;

		db.findOne(UserModel, query, projection, function (result){
			if(result != null){
				bcrypt.compare(password, result.password, function(err, equal) {
					if(equal){
						res.send(true)
					}
                     
                    else {
                    	res.send(false)
                    }

                });	
			}
			else {
				res.send(false)
			}
		})
	}
}

module.exports = loginController;