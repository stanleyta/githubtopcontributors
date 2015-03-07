var httpMocks = require('node-mocks-http'); //no async?!
var supertest = require('supertest');
//var nock = require('nock');

var assert = require("assert")
var should = require('should');

var express = require('express');
app = express();

var mod = require("../lib/mod.js");
app.use('/api/get', mod.get);

//app = {};
require('../server/js/logger'); //app.logger.info
//(function() { //silence logger
//    app.logger = {};
//    app.logger.debug = function(){};
//    app.logger.info = function(){};
//    app.logger.warn = function(){};
//    app.logger.error = function(){};
//    app.logger.fatal= function(){};
//}());



var mockObj = {
    "wassup": "yo"
}
//nock('https://api.github.com').get('/repos/stanleyta/githubtopcontributors/contributors').reply(200, {
//    _id: '123ABC',
//    _rev: '946B7D1C',
//    username: 'pgte',
//    email: 'pedro.teixeira@gmail.com'
//});

describe('module', function(){
    describe('get request', function(){
        it('should default repo with no url', function(){

//            supertest(app)
//                .get('/api/get')
//                .expect('Content-Type', /json/)
//                .expect('Content-Length', '20')
//                .expect(200)
//                .end(function(err, res){
//                    if (err) throw err;
//                });


            var request  = httpMocks.createRequest({
                method: 'GET',
                port: 443,
                url: '/api/get',
                query: {
                    url: '/repos/stanleyta/githubtopcontributors/contributors'
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

            var response = httpMocks.createResponse();
            mod.get(request, response);
            var data = response._getData();
            app.logger.info("output from _getHeaders: " + JSON.stringify(response._getHeaders()));
            app.logger.info("output from _getData: " + response._getData());
            app.logger.info("output from _getStatusCode: " + response._getStatusCode());
            app.logger.info("output from data: " + data);
            app.logger.info("output from mockObj: " + mockObj);

            assert.equal(200, response.statusCode);
            data.should.eql(42);
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