var express = require('express')
var router = express.Router()

router.use('/user', require('./user'));
router.use('/form', require('./form'));


router.get('/', function(req, res, next) {
   res.json({res: 1, resMsg: 'Welcome to lifeTracker'});  
})

/*
//Change the path to the index.html in public folder for the rendering the client side
router.get('/*', function(req, res){
    res.sendFile('/home/dev/Turris/server/public/index.html');
});

*/

module.exports = router
