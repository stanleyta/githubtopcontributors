var passport = require('passport');

// app/passport_routes.js
module.exports = function() {
    app.get('/login', passport.authenticate('github', {scope: ['user','repo']}));

    // process the login form
//    app.post('/login', function(req, res, next) {
//        passport.authenticate('local', {
//            successRedirect : req.session.returnTo || '/', // redirect to the secure profile section
//            failureRedirect : '/login', // redirect back to the login page if there is an error
//            failureFlash : true // allow flash messages
//        })(req, res, next)
//    });

    app.get('/auth/error', function(req, res, next) {
        //auth.
        res.status(500).send("github auth error"); // + req.query.error
    });
    app.get('/auth/github/callback',
            passport.authenticate('github', {
            successRedirect : '/',
            failureRedirect: '/auth/error'}));
};