
var https = require('https');

exports.get = function(req, res) {
//    var username = '';
//    var password = '';
//    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
//    var header = {'Host': 'www.example.com', 'Authorization': auth};
//    var request = client.request('GET', 'https://api.github.com/repos/stanleyta/githubtopcontributors/contributors', header);

    var url = req.body.url || req.query.url || '/repos/stanleyta/githubtopcontributors/contributors';
    var auth = 'token ' + req.session.passport.user.accessToken;
    var options = {
        host: 'api.github.com',
        port: 443,
        method: "GET",
        path: url,
        headers: {
            "Authorization": auth,
            "User-Agent": req.session.passport.user.profile.username
        }
    };

    var req = https.request(options, function(in_res) {
        var output = '';
        app.logger.info(options.host + ':' + res.statusCode);
        in_res.setEncoding('utf8');
        in_res.pipe(process.stdout);
        in_res.on('data', function(chunk){
            output += chunk;
            app.logger.info("chunk: " + chunk + "..");
        });
        app.logger.info("data: " + output + "..");
        in_res.on('end', function(test) {
            res.setHeader('Content-Type', 'application/json');
            res.write(output);
            res.end();
        });
        //TODO handle other status codes eg 401 403 404
    });
    req.on("error", function(e){
        app.logger.error(e);
    });
    req.end();
};