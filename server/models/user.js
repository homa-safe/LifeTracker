var pass = require('../helpers/pass.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//environment variables
var env = require('../config/env.js');
var config = require('../config/config.js');

//json web token
var jwt    = require('jsonwebtoken');


var User = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true },
        password: {
        type: String,
        required: true
    },
        pass_salt: {
        type: String,
        required: true
    },
    gender: String ,
    age: Number ,
    marriageStatus: String ,
    occupancy: String ,
    diseases: String ,
    allergies: String ,
    specialCare: String ,
    doctors: String ,
    emergencyRelation: String ,
    emergencyName: String ,
    emergencyPhone: Number,
    create_time: Date
});

User.methods.getId = function() {
    return (this._id);
};

var user = mongoose.model('User', User);

exports.createUser = function(username, password, name, cb){
    //Create user in the database with necessary information
    var passSalt = pass.makeSalt();
    var passHash = pass.encryptPassword(password, passSalt);
    if(username == null || password == null || name == null || username == "" || password == "" || name == ""){
        return cb(null, -1, null, null);
    }
    else{
        user.findOne({ username: username } , function(err, document) {
            if(err){
                return cb(err);
            }
            if(document == null){
                var newUser = new user({username:username, password: passHash, pass_salt: passSalt, name: name, create_time: new Date()});
                newUser.save(function(err, result){
                    if(err){
                        return cb(err);
                    }
                    return cb(null, 1, result._id, 'u');
                });
            }
            else{
                return cb(null, 0, null, null);          
            }
        });
    }
        
}

exports.login = function(username, password, cb){
    //Check username and password for the user for login purpose
        user.findOne( { username: username } , function(err, document) {
            if(err){
                return cb(err);
            }
            if(document == null){
                return cb(null, 0, null, null);
            }
            else if(!pass.authenticate(password, document.pass_salt, document.password)){
                return cb(null, 0, null, null);
            }
            else{
                return cb(null, 1, document._id, 'u');
            }
            
        });     
}


exports.setProfile = function(userId, name, gender, age, marriageStatus, occupancy, diseases, allergies, specialCare, doctors, emergencyRelation, emergencyName, emergencyPhone, cb){
	//Set the user profile information
	user.findByIdAndUpdate(userId, { $set: {name: name, gender: gender, age: age, marriageStatus: marriageStatus, occupancy: occupancy, diseases: diseases, allergies: allergies, specialCare: specialCare, doctors: doctors, emergencyRelation: emergencyRelation, emergencyName: emergencyName, emergencyPhone: emergencyPhone}}, { new: true }, function (err, user) {
        if(err){
          return cb(err);
        }
	    return cb(null);
  })
}

exports.fetchProfile = function(userId, cb){
    user.findOne( { _id: userId } , function(err, document) {
            if(err){
                return cb(err);
            }
        return cb(null, document);
    })
}


