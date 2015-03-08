var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session');

app = express(); //no var means global. can append subclasses to this object to make them global as well


// view engine setup
app.set('view engine', 'jade');

// static routes
app.set('views', path.join(__dirname, '../server/views'));
app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use(express.static(path.join(__dirname, '../public')));

app.set('connect_secret', 'shhh');
app.use(morgan('dev')); // morgan - log every request to the console
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-server.js-form-urlencoded
app.use(cookieParser());
app.use(session({ secret: app.get('connect_secret')}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.users = {}; //store users in volatile memory - no mongodb required for this sample project

// global and session variables
app.locals = {
    projectName: 'githubtopcontributors',
    title: 'githubtopcontributors'
};
app.use(function(req,res,next){
    req.session.returnTo = "";//clear returnUrl
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use('/', require('./routes/index_routes'));
require('./routes/passport_routes')();
require('./js/passport_integration')();
app.logger = require('./js/logger'); //app.logger.info

//all other routes that require authentication
app.use('/api', require('./js/require_authentication'));

//API
var mod = require('./routes/mod_route.js');
app.use('/api/get', mod.get);

module.exports = app;