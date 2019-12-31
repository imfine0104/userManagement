var db = require('../db');
var md5 = require('md5');

module.exports.login = function(req, res){
	res.render('auth/login');
};

module.exports.postLogin = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var erorrs = [];
	var user = db.get('auth').find({user: username}).value();

	if(!user){
		erorrs.push('User is not exist.'),
		res.render('auth/login',{
			erorrs: erorrs,
			values: req.body
		});
		return
	}
	var hashedpassword = md5(password);

	if(user.password !== hashedpassword){
		erorrs.push('Password is wrong.');
		res.render('auth/login',{
			erorrs: erorrs,
			values: req.body
		});
		return
	}

	res.cookie('userId', user.id,{
		signed: true
	});
	res.redirect('/users');
};