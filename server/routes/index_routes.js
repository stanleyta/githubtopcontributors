var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/start');
    }
    else {
        res.render('index', { message : 'Hello World!' });
    }
});
router.get('/start', function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }
    else {
        res.render('start', { message : 'Welcome!', user: req.session.passport.user.profile.username });
    }
});

module.exports = router;
