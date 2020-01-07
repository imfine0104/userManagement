require('dotenv').config();
var express = require('express');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productsRoute = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');


var cookieParser = require('cookie-parser');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var app = express();

var port = 3000;



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
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
app.use('/cart', cartRoute);
app.use('/products', productsRoute);


app.listen(port, function(){
	console.log('Sever listening on port ' + port);
});
