describe('user-plugin', function
    () {
    var mongoose = require('mongoose');
    var UserPlugin = require(projectPath('/models/user/user-plugin'));
    var testUserSchema = mongoose.Schema({});
    testUserSchema.plugin(UserPlugin);
    var TestUser = mongoose.model('testUser', testUserSchema, 'testUser');

    const USER_NAME = 'TheBurgerBoss';
    const FIRST_NAME = 'Bob';
    const LAST_NAME = 'Belcher';
    const PASSWORD = 'I love Burgers';
    var TEST_USER = new TestUser({
        userName: USER_NAME,
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        password: PASSWORD
    });

    var createUser = function (user) {
        return new Promise(function (resolve, reject) {
            user.save(function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
        });
    };

    before(function(done){
        TestUser.remove({}, function(){
            done();
        });
    });

    after(function (done) {
        mongoose.connection.db.dropCollection('testUser', function (err, result) {
            done();
        });
    });


    it('should persist and retrieve user data', function (done) {
        createUser(TEST_USER).then(function (user) {
            TestUser.loadUser(user._id).then(function (testUser) {
                expect(testUser.firstName).to.equal(FIRST_NAME);
                expect(testUser.lastName).to.equal(LAST_NAME);
                expect(testUser.userName).to.equal(USER_NAME);
                testUser.comparePassword(PASSWORD).then(function (match) {
                    expect(match).to.be.true;
                    done();
                });
            });
        });
    });

    it('should not allow required fields to be blank', function (done) {
        var emptyUser = new TestUser({});
        createUser(emptyUser).catch(function (err) {
            expect(err.errors.firstName.type).to.equal('required');
            expect(err.errors.lastName.type).to.equal('required');
            expect(err.errors.userName.type).to.equal('required');
            expect(err.errors.password.type).to.equal('required');
            done();
        });
    });
});