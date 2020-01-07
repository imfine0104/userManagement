var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllerUser');
var validate = require('../validates/user.validate');
var multer  = require('multer');

var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);

router.get('/search', controller.getSearch);

router.get('/create', controller.create);

router.get('/:id', controller.getId);

router.post('/create', 
	upload.single('avatar'), 
	validate.postCreate, 
	controller.postCreate);

module.exports = router;
