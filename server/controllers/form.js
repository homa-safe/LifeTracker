var express = require('express');
var router = express.Router();

var config = require('../config/config.js');
var env = require('../config/env.js');

var form = require('../models/form');
var auth = require('../middlewares/user');


router.post('/update', auth, function(req,res,next){
    //if formId = -1, this is a new form, if not it is an update to an existing form
    form.setForm(req.decoded.id, req.body.formId, req.body.sleep, req.body.breakfastMeal, req.body.breakfastDrink, req.body.lunchMeal, req.body.lunchDrink, req.body.dinnerMeal, req.body.dinnerDrink, req.body.snack1, req.body.snack2, req.body.snack3, req.body.supplementary, req.body.water, req.body.exerciseDuration, req.body.exerciseExplanation, req.body.dayMood, req.body.unusualFeeling, req.body.sickness, req.body.additionalComment, function(err){
        if(err){
             console.error(new Error(err));
            return next(err);
        }
        res.json({res: 1, resMsg: 'Form created/updated.', token: req.token});
    })
})

router.post('/list', auth, function(req,res,next){
    form.getAllForms(req.decoded.id, function(err, formsList){
        if(err){
             console.error(new Error(err));
            return next(err);
        }
        res.json({res: 1, resMsg: 'Fetched forms list.', formsList: formsList, token: req.token});
    })
})

router.post('/list/details', auth, function(req,res,next){
    form.getFormDetails(req.body.formId, function(err, formDetail){
        if(err){
             console.error(new Error(err));
            return next(err);
        }
        res.json({res: 1, resMsg: 'Fetched form details.', formDetail: formDetail, token: req.token});
    })
})


module.exports = router;