module.exports.postCreate = function(req, res, next){
	var erorrs = [];
	if(!req.body.name){
		erorrs.push('Name is required');
	}
	if(!req.body.age){
		erorrs.push('Age is required');
	}
	if(erorrs.length){
		res.render('users/create', {
			erorrs: erorrs,
			values: req.body
		});	
		return;
	}
	
	next();
}