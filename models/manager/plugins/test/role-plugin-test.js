describe('role-plugin', function () {
    //TODO(EG) fix tests: howManyNeeded should be undefined for general roles of the organization
    //TODO(EG) need to test adding role to template-shift and work shift
    var mongoose = require('mongoose');
    var testManagerSchema = mongoose.Schema({});
    testManagerSchema.plugin(require(projectPath('/models/user/user-plugin')));
    testManagerSchema.plugin(require(projectPath('/models/manager/plugins/role-plugin')));
    var TestManager = mongoose.model('TestManager', testManagerSchema);
    var USER_DATA = {
        firstName: 'Bob',
        lastName: 'Belcher',
        userName: 'BurgerBoss',
        password: 'I love burgers'
    };
    const ROLE_1_NAME = 'cook', ROLE_1_HOW_MANY = 3;
    const ROLE_1 = {
        roleName: ROLE_1_NAME,
        howManyNeeded: ROLE_1_HOW_MANY
    };
    const ROLE_2_NAME = 'waiter', ROLE_2_HOW_MANY = 5;
    const ROLE_2 = {
        roleName: ROLE_2_NAME,
        howManyNeeded: ROLE_2_HOW_MANY
    };
    var userId;

    beforeEach(function (done) {
        TestManager.remove({}, function () {
            var testManager = new TestManager(USER_DATA);
            testManager.save(function (err, user) {
                userId = user._id;
                done();
            });
        });
    });

    after(function (done) {
        mongoose.connection.db.dropCollection('TestManager', function (err, result) {
            mongoose.connection.models = {};
            done();
        });
    });

    it('should create and persist a role', function () {
        var roleId;

        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY).then(function (generatedRoleId) {
            roleId = generatedRoleId;
            return TestManager.loadUser(userId);
        }).then(function (testManager) {
            chaiObjEquality.containsEqualProps(ROLE_1, testManager.roles.id(roleId));
        });
    });

    it('should create 2 roles and retrieve them', function () {
        return Promise.all(
            [TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY),
                TestManager.addRole(userId, ROLE_2_NAME, ROLE_2_HOW_MANY)]
        ).then(function () {
            return TestManager.getRoles(userId);
        }).then(function (userRoles) {
            expect(userRoles.length).to.equal(2);
            expect(deleteObjIds(userRoles)).to.contain(ROLE_1);
            expect(deleteObjIds(userRoles)).to.contain(ROLE_2);
        });
    });

    it('should create 2 roles and delete one', function () {
        return Promise.all(
            [TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY),
                TestManager.addRole(userId, ROLE_2_NAME, ROLE_2_HOW_MANY)]
        ).then(function (resolvedRoleIdArray) {
            return TestManager.deleteRole(userId, resolvedRoleIdArray[0])
        }).then(function () {
            return TestManager.getRoles(userId);
        }).then(function (userRoles) {
            expect(userRoles.length).to.equal(1);
            expect(deleteObjIds(userRoles)).to.contain(ROLE_2);
        });
    });

    it('should update role while and not change role._id property', function () {
        var updatedRole;
        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY)
            .then(function (roleId) {
                updatedRole = {
                    _id: roleId,
                    roleName: ROLE_2_NAME,
                    howManyNeeded: ROLE_2_HOW_MANY
                };
                return TestManager.updateRole(userId, updatedRole)
            }).then(function (user) {
                return TestManager.getRoles(userId);
            }).then(function (roles) {
                expect(roles.length).to.equal(1);
                expect(roles[0]).to.deep.equal({
                    _id: updatedRole._id.toString(),
                    roleName: updatedRole.roleName,
                    howManyNeeded: updatedRole.howManyNeeded
                });
            });
    });


    it('should try to add a role with the same name of a role that is already added', function () {
        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY)
            .then(function () {
                return TestManager.addRole(userId, ROLE_1_NAME, ROLE_2_HOW_MANY);
            }).then(function () {
                expect.fail('should reject adding role due to unique name requirement');
            }).catch(function (errObj) {
                expect(errObj.message).to.equal('Duplicate roleName');
                expect(Object.keys(errObj).length).to.equal(1);
                expect(errObj[ROLE_1_NAME].length).to.equal(2);//TODO(EG) specify what behavior cooks object should be
            });
    });

    it('should try to update a role to have a name that another role already has', function () {
        var role1Id;
        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY)
            .then(function (generatedId) {
                role1Id = generatedId;
                return TestManager.addRole(userId, ROLE_2_NAME, ROLE_2_HOW_MANY);
            })
            .then(function () {
                return TestManager.updateRole(userId, {
                    _id: role1Id.toString(),
                    roleName: ROLE_2_NAME,
                    howManyNeeded: ROLE_1_HOW_MANY
                });
            })
            .then(function () {
                expect.fail('should reject updating role due to unique name requirement');
            })
            .catch(function (errObj) {
                expect(errObj.message).to.equal('Duplicate roleName');
                expect(Object.keys(errObj).length).to.equal(1);
                expect(errObj[ROLE_2_NAME].length).to.equal(2);
            });
    })

});