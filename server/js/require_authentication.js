module.exports = function(req,res,next){
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    app.logger.info("Not authenticated. Routing to Login screen. URL: " + req.path)
    req.session.returnTo = req.path; //save the URL for redirect after authentication
    res.redirect('/');
}