var env = process.env.NODE_ENV || 'local';


var config = {
  // local config
  local: {
    tokenSecret: 'pdysgd62cl3car1kyb9o6qhdactmd9zp3dnp14i',
    port: 8080,
    db: {
      password: '',
      username: '',
      host: 'localhost',
      database: 'tutogeeks',
      port: 27017
    }
  }
};


module.exports = config[env];
