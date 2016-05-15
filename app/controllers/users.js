var User = require('../../common/models/users'),
    _ = require('lodash');

module.exports = function(app){


  app.get('/', function(req, res){
    return res.status(200).send({success: true, data: []})
  })
  return app;
  // return Router;
};

// Router.get('/', function(req, res){

// });
