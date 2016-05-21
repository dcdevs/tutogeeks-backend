var express = require('express'),
  router = express.Router();

var erroHandler = require('../middlewares/errorHandler');

function Router(app, passport) {

  // error handler
  app.use(erroHandler.parseError);


  //oauth route
  app.use('/oauth', require('../controllers/oauth'));

  //users route
  app.use('/users', require('../controllers/users'));


  //The 404 Route (ALWAYS Keep this as the last route)
  app.use(function(req, res) {
    res.status(404).send({ code: 404, success: false, key: true, message: req.tr('not_found') });
  });
}


module.exports = Router;
