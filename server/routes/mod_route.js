
var mod = require('githubtopcontributors_module');

module.exports.get = function(req, res) {
    mod.get(req.body.url || req.query.url,
        req.session.passport.user.accessToken,
        req.session.passport.user.profile.username)
    .then(function (value) {
        res.setHeader('Content-Type', 'application/json');
        res.write(value);
        res.end();
    });
};