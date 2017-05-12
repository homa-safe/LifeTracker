var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//environment variables
var env = require('../config/env.js');
var config = require('../config/config.js');

//json web token
var jwt    = require('jsonwebtoken');


var Form = new Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sleep: String,
    breakfastMeal: String,
    breakfastDrink: String,
    lunchMeal: String,
    lunchDrink: String,
    dinnerMeal: String,
    dinnerDrink: String,
    snack1: String,
    snack2: String,
    snack3: String,
    supplementary: String,
    water: String,
    exerciseDuration: String,
    exerciseExplanation: String,
    dayMood: String,
    unusualFeeling: String,
    sickness: String,
    additionalComment: String,
    date: {type: Date, default: Date.now} 
});

var form = mongoose.model('Form', Form);


exports.setForm = function(userId, formId, sleep, breakfastMeal, breakfastDrink, lunchMeal, lunchDrink, dinnerMeal, dinnerDrink, snack1, snack2, snack3, supplementary, water, exerciseDuration, exerciseExplanation, dayMood, unusualFeeling, sickness, additionalComment, cb){
    //if formId = -1, this is a new form, if not it is an update to an existing form
    if(formId == -1){
        var newForm = new form({user: userId, sleep: sleep, breakfastMeal: breakfastMeal, breakfastDrink: breakfastDrink, lunchMeal: lunchMeal, lunchDrink: lunchDrink, dinnerMeal: dinnerMeal, dinnerDrink: dinnerDrink, snack1: snack1, snack2: snack2, snack3: snack3, supplementary: supplementary, water: water, exerciseDuration: exerciseDuration, exerciseExplanation: exerciseExplanation, dayMood: dayMood, unusualFeeling: unusualFeeling, sickness: sickness, additionalComment: additionalComment});
        newForm.save(function(err, result){
            if(err){
                return cb(err);
            }
            return cb(null, result._id);
        })
    }
    else{
        form.findByIdAndUpdate(formId, { $set: {sleep: sleep, breakfastMeal: breakfastMeal, breakfastDrink: breakfastDrink, lunchMeal: lunchMeal, lunchDrink: lunchDrink, dinnerMeal: dinnerMeal, dinnerDrink: dinnerDrink, snack1: snack1, snack2: snack2, snack3: snack3, supplementary: supplementary, water: water, exerciseDuration: exerciseDuration, exerciseExplanation: exerciseExplanation, dayMood: dayMood, unusualFeeling: unusualFeeling, sickness: sickness, additionalComment: additionalComment}}, { new: true }, function (err, form) {
            if(err){
          return cb(err);
        }
	    return cb(null);
        })
    }
    
}

exports.getAllForms = function(userId, cb){
    form.find({user: userId}, ['_id', 'date'], {sort: {date: -1}}, function(err, forms){
        if(err){
            return cb(err);
        }
        return cb(null, forms);
    })
}

exports.getFormDetails = function(formId, cb){
    form.findOne({_id: formId}, function(err, form){
        if(err){
            return cb(err);
        }
        return cb(null, form);
    })
}
