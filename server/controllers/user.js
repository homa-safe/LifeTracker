var express = require('express');
var router = express.Router();

var config = require('../config/config.js');
var env = require('../config/env.js');
var jwt    = require('jsonwebtoken');

var user = require('../models/user');
var auth = require('../middlewares/user');


router.post('/signup', function(req, res, next){
    //sign up the user with the necessary information for creating a new account and send email verification email to the user
    user.createUser(req.body.username, req.body.password, req.body.name, function(err, code, user, userType){
    if(err){
      console.error(new Error(err));
      return next(err);
    }
    else if(code == 0){
        res.json({res: 0, resMsg: 'Username exists.'});    
    }
    else if(code == -1){
            res.json({res: -1, resMsg: 'Mandatory fields are not entered or entered in wrong format.'}); 
    }
    else{
        var token = jwt.sign({id: user, type: userType}, env.JWTSecret, {
            expiresIn:  config.LOGIN_TOKEN_EXPIRY
          });
          res.json({res: code, resMsg: 'User registered, verification email sent', token: token});
    }
  })
})

router.post('/login', function(req, res, next){
    //check the username and password and login the user if successful
    user.login(req.body.username, req.body.password, function(err, code, user, userType){
      if(err){
        console.error(new Error(err));
        return next(err);
      }
      else if(code == 1){
        var token = jwt.sign({id: user, type: userType}, env.JWTSecret, {
            expiresIn:  config.LOGIN_TOKEN_EXPIRY
          });
          res.json({res: code, resMsg: 'User logged in', token: token});
        }
        else if (code == 0){
          res.json({res: code, resMsg: "Invalid Username and/or Password"});
        }
        else{
          res.json({res: code, resMsg: "Suspended user"});
        }
    })
})

router.post('/logout', auth, function(req, res, next){
    //log out the user
      res.json({res: 1, resMsg:'User logged out'});
})


router.post('/profile/update', auth, function(req, res, next){
    //Sets the user profile information
    user.setProfile(req.decoded.id, req.body.name, req.body.gender, req.body.age, req.body.marriageStatus, req.body.occupancy, req.body.diseases, req.body.allergies, req.body.specialCare, req.body.doctors, req.body.emergencyRelation, req.body.emergencyName, req.body.emergencyPhone, function(err){
      if(err){
        console.error(new Error(err));
        return next(err);
      }
      res.json({res: 1, resMsg: 'User profile updated.', token: req.token});
    })
})

router.post('/profile', auth, function(req, res, next){
    //Fetches the user profile information
    user.fetchProfile(req.decoded.id, function(err, profileInfo){
      if(err){
        console.error(new Error(err));
        return next(err);
      }
    res.json({res: 1, resMsg:'User profile fetched.', profileInfo: profileInfo, token: req.token});
    })
})

module.exports = router;