const adminSettingsController = {
	adminSettings: function(req,res){
		if(req.session.type=="admin"){
			res.render('admin-settings-page');
		}
		else{
			res.redirect('/')
		}	
	}
}

module.exports = adminSettingsController;