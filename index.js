var express = require('express');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');
var cookieParser = require('cookie-parser');


var app = express();

var port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function(req, res){
	res.render('index', {
		name: 'in my life ^^'
	});

});

app.use(express.static('public'));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function(){
	console.log('Sever listening on port ' + port);
});
