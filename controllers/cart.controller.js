var db = require('../db');

module.exports.addToCart = function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	var find = function(){
		return db.get('sessions').
		find({ id: sessionId});
	}

	var count = find().get('cart.' + productId, 0).value();

	find().set('cart.' + productId, count + 1).write();

	res.redirect('/products');
}