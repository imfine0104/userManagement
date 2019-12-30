var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllerUser.js');

router.get('/', controller.index);

router.get('/search', controller.getSearch);

router.get('/create', controller.create);

router.get('/:id', controller.getId);

router.post('/create', controller.postCreate);

module.exports = router;
