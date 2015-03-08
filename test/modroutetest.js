var httpMocks = require('node-mocks-http'); //no async?!
var nock = require('nock');
var events = require('events');

var assert = require("assert")
var should = require('should');

var express = require('express');
app = express();

var mod = require("../server/routes/mod_route.js");
app.use('/api/get', mod.get);

app = {};
app.logger = require('../server/js/logger');
(function() { //silence logger
    app.logger.debug = app.logger.info = app.logger.warn = app.logger.error = app.logger.fatal= function(){};
}());

var mockObj = 42;

beforeEach(function(done){
    nock.cleanAll();
    done();
});

describe('module', function(){
    describe('get request', function(){
        it('should default repo with no url', function(done){
            nock('https://api.github.com').get('/repos/stanleyta/githubtopcontributors/contributors').reply(200, mockObj);
            var request  = httpMocks.createRequest({
                method: 'GET',
                port: 443,
                url: '/api/get',
                session: {
                    passport: {
                        user: {
                            accessToken: 1,
                            profile: {
                                username: 'sta'
                            }
                        }
                    }
                }
            });

            var response = httpMocks.createResponse({eventEmitter: events.EventEmitter});
            mod.get(request, response);
            app.logger.info("full request: " + JSON.stringify(request));
            app.logger.info("output from _getHeaders: " + JSON.stringify(response._getHeaders()));
            app.logger.info("output from _getStatusCode: " + response._getStatusCode());
            app.logger.info("output from mockObj: " + JSON.stringify(mockObj));

            response.on('end', function () {
                app.logger.info("mock end!");
                app.logger.info("full response: " + JSON.stringify(response));
                app.logger.info("full response headers: " + JSON.stringify(response._getHeaders()));
                app.logger.info("output from _getData: " + JSON.stringify(response._getData()));
                assert.equal(200, response.statusCode);
                assert.equal(response._getHeaders()["Content-Type"], "application/json");
                response._getData().should.eql(mockObj.toString());
                done();
            });
        })
    })
});


describe('module', function(){
    describe('get request', function(){
        it('should override default repo with query string url', function(done){
            nock('https://api.github.com').get('/repos/stanleyta/githubtopcontributors/contributors').reply(200, 1);
            nock('https://api.github.com').get('/repos/sta/githubtopcontributors/contributors').reply(200, 2);

            var request  = httpMocks.createRequest({
                method: 'GET',
                port: 443,
                url: '/api/get',
                query: {
                    url: '/repos/sta/githubtopcontributors/contributors'
                },
                session: {
                    passport: {
                        user: {
                            accessToken: 1,
                            profile: {
                                username: 'sta'
                            }
                        }
                    }
                }
            });

            var response = httpMocks.createResponse({eventEmitter: events.EventEmitter});
            mod.get(request, response);

            response.on('end', function () {
                assert.equal(200, response.statusCode);
                assert.equal(response._getHeaders()["Content-Type"], "application/json");
                response._getData().should.eql("2");
                done();
            });
        })
    })
});

describe('simple', function(){
  describe('multiplication', function(){
    it('should be really easy', function(){
      assert.equal(-1, 1 * -1);
      assert.equal(1, -1 * -1);
    })
  })
})