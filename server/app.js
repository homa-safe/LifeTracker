var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')


var env = require('./config/env.js');
var config = require('./config/config.js');

var mongoose = require('mongoose');

mongoose.connect(config.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('internal error');
});


app.listen(env.port, function() {
  console.log('Listening on port ' + env.port);
})
