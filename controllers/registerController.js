
const db = require("../models/db");
const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const saltRounds = 10;

const registerController = {
	register: function(req,res){
		res.render('register');
    },
    getCheckEmail: function(req, res) {
        var email = req.query.email;
		db.findOne(User, {email:email}, 'email', function(result) {
			res.send(result);
		}) 
	},
    postRegister: function(req,res){
        var firstname = req.body.firstname
        var lastname = req.body.lastname
        var email = req.body.email
        var password = req.body.password

        bcrypt.hash(password, saltRounds, function(err, hash) {
            var user = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                type: "customer",
                password: hash,
                points: 0,
                address: [],
                orders: [],
                wishlist: []
            }
            db.insertOne(User, user, function(){
                res.redirect('/')
            })
        })
    }
}

module.exports = registerController;