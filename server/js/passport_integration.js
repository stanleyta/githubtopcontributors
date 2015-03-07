var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github').Strategy;

module.exports = function() {
    passport.serializeUser(function(user, done) {
        //serialize by user id
        done(null, user)
    });
    passport.deserializeUser(function(user, done) {
        //find user in database again
        //var user = app.users[id];
        //var user = {id: 1, username:'guest', password:'guest'};
        done(null, user);
    });
    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
        function(req, username, password, done) {
            if (username != "guest")
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            if (password != "guest")
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            var user = {id: 1, username:username, password:password};
            app.users[user.id] = user;
            return done(null, user);
        }
    ));
    passport.use(new GithubStrategy({
        clientID: '1f3313a5ac067bc53003',
        clientSecret: 'e43e4bec0660d5bfc8c6779ba0d76d0918d68659',
        callbackURL: 'http://localhost:3001/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done){
        done(null, {
            accessToken: accessToken,
            profile: profile
        });
    }));
};