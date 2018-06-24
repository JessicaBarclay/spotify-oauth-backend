var app = 'http://localhost:8888',
    chai = require ('chai'),
    request = require('supertest')
    expect = chai.expect;

describe('root', function() {
  describe('/login', function() {
    it('finds spotify login resource and responds with 302 FOUND', function(done) {
      request(app).get('/login')
      .end(function(error, response) {
        expect(response.statusCode).to.equal(302);
        done();
      });
    });
  });
  describe('/callback', function() {
    it('redirects with access_token query string and responds with 302 FOUND', function(done) {
      request(app).get('/callback')
      .end(function(error, response) {
        expect(response.statusCode).to.equal(302);
        done();
      });
    });
  });
});