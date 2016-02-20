describe.skip('integrated user test', function () {
    before(function removeUsers(done) {
        User.remove({}, function (err) {
            done();
        });
    });
    it('should create a user', function (done) {
        var newUser = {
            firstName: 'Jean',
            lastName: 'Claude Van-Damme',
            userName: 'Jeanny',
            password: 'I am the best at karate'
        };

        var createManager = new Promise(function (resolve, reject) {
            api.post('/manager')
                .set('Accept', 'application/json')
                .type('json')
                .send({newUser: newUser})
                .expect(200).end(function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });

        createManager.then(function () {
            api.get('/admin/lastUser').expect(200).end(function (err, res) {
                if (err) throw err;
                var lastUser = res.body;
                expect(newUser.firstName).to.equal(lastUser.firstName);
                expect(newUser.lastName).to.equal(lastUser.lastName);
                expect(newUser.userName).to.equal(lastUser.userName);
                done();
            });
        });
    });

    it('should logout', function () {
        api.put('/manager/logout')
            .set('Accept', 'application/json')
            .type('json')
            .expect(200).end(function (err, res) {
            if (err) throw err;
        });
    });
});

