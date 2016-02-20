var Promise = require('bluebird');
var supertest = require('supertest-session');
var api = supertest('http://localhost:3000');
var expect = require('chai').expect;
var newUser = {
    firstName: 'Jean',
    lastName: 'Claude Van-Damme',
    userName: 'Jeanny',
    password: 'I am the best at karate'
};

var createManager = function () {
    return new Promise(function (resolve, reject) {
        api.post('/manager')
            .set('Accept', 'application/json')
            .type('json')
            .send({newUser: newUser})
            .expect(200).end(function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
    })
};

module.exports = createManager;