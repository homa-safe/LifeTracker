'use strict';

//crypto
var crypto;
	try {
		crypto = require('crypto');
	} catch (err) {
		console.log('crypto support is disabled!');
}

//make password salt
exports.makeSalt = function(){
	return crypto.randomBytes(16).toString('base64');
};

//encrypt password
var encryptPassword = exports.encryptPassword = function(password, salt){
	if(!password || !salt ){
		return '';
	}
	salt = new Buffer(salt, 'base64');
	return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

//Authenticate password
exports.authenticate = function(password, pass_salt, pass_hash){
    return encryptPassword(password, pass_salt) === pass_hash;
  };
