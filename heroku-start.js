var express = require('express');
var gulp = require('gulp');
var app = express();

require('./gulpfile.js');

gulp.start('default');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(request, response) {
    response.render('index');
});
