var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Utils = require('../utils/utils');
var User = require('../../common/models/users');
var middleware = require('../middlewares/middlewares');

module.exports = router;


router.get('/', middleware.verify, function(req, res) {
  res.send({ success: true, data: [] });
})


router.post('/', middleware.verify, function(req, res) {


})
