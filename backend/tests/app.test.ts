import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app'; 
import { describe, it } from 'mocha';

describe('GET /api', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: any, res: request.Response) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Hello, world!');
        done();
      });
  });
});
