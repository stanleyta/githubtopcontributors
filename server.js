#!/usr/bin/env node
process.on('uncaughtException', function(e) {
    console.error('Unhandled Exception: ' + e + '\r\n' + e.stack);
});

var app = require('./server/app');

app.set('port', process.env.PORT || 3001);

var server = app.listen(app.get('port'), function() {
    app.logger.info('Express server listening on port ' + server.address().port);
});