var express = require('express'),
  router = express.Router();

var Users = require('../controllers/users');

function Router(app, passport) {

  app.use('/users', Users(router));
  //The 404 Route (ALWAYS Keep this as the last route)
  app.use(function(req, res) {
    res.status(404).send({ code: 404, success: false, key: true, message: req.trans('not_found') });
  });
}


module.exports = Router;
