var jwt    = require('jsonwebtoken');
var env = require('../config/env.js');

var config = require('../config/config.js');

module.exports = function(req, res, next) {
  //Checks if the user is logged in

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, env.JWTSecret, function(err, decoded) {
      if (err) {
        return res.status(401).send('User is not authorized.');
      } else {
            // if everything is good, save to request for use in other routes
            if(decoded.type != 'u'){
              return res.status(401).send('User is not authorized.');
            }
            else{
                 // if everything is good, save the request for use in other routes and also create a new token with new expiry and put it in req.token
                 var token = jwt.sign({id: decoded.id, type: 'u'}, env.JWTSecret, {
                        expiresIn: config.LOGIN_TOKEN_EXPIRY
                });
                req.decoded = decoded;
                req.token = token;
                
              next();
            }
      }
    });
  } else {
    return res.status(401).send('User is not authorized.');
  }
};