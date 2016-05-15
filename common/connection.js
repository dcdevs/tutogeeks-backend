var mongoose = require('mongoose');
var config = require('../config/config');

//mongoose paginate plugin
require('mongoose-query-paginate');

//connection url
var uri = 'mongodb://' + config.db.host + '/' + config.db.database;

// execute connection
mongoose.connect(uri, { user: config.db.username, password: config.db.password }, function(err, res){
  if(err) throw err;

  console.log('Connected to db: ' + uri);
});


module.exports = mongoose;
