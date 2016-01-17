describe.skip('integrated shift test', function () {
    var SHIFT1_NAME = 'breakfast';
    var SHIFT2_NAME = 'preptime';
    var SHIFT3_NAME = 'all day clean';
    var shift1 = {
        roles: [{
            name: 'waiter',
            number: 2
        }],
        startTime: [8, 30],
        endTime: [9, 30],
        name: SHIFT1_NAME
    };

    var shift2 = {
        roles: [{
            name: 'cook',
            number: 3
        }],
        startTime: [10, 0],
        endTime: [14, 0],
        name: SHIFT2_NAME
    };

    var shift3 = {
        roles: [{
            name: 'waiter',
            number: 2
        }],
        startTime: [4, 14],
        endTime: [18, 0],
        name: SHIFT3_NAME
    };

    var emptyShiftObj = {
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    };


    beforeEach(function (done) {
        var usersRemove = new Promise(function(resolve, reject){
            User.remove({}, function (err) {
                err? reject(err): resolve();
            });
        });

        var newUser = {
            firstName: 'Jean',
            lastName: 'Claude Van-Damme',
            userName: 'Jeanny',
            password: 'I am the best at karate'
        };
        usersRemove.then(function(){
            api.post('/manager').send({newUser: newUser}).end(function (err, res) {
                if (err) throw err;
                done();
            });
        });
    });


    it('should access empty shifts', function (done) {
        api.get('/shifts').expect(200).end(function (err, res) {
            if (err) throw err;
            expect(res.body.shifts).to.deep.equal(emptyShiftObj);
            done();
        });
    });

    it('should create two shifts', function (done) {
        var shifts = [shift1];
        User.sortShiftArray(shifts);

        api.put('/shifts/add').send({
            shift: shift1,
            day: 'monday'
        }).expect(200).end(function (err, res) {
            if (err) throw err;
            api.get('/shifts').expect(200).end(function (err, res) {
                if (err) throw err;

                chaiObjEquality.containsEqualProps(shifts, res.body.shifts['monday']);
                done();
            });
        });
    });

    it('should create 3 monday shifts, then delete 1', function (done) {
        var apiCreateShift = function (shift, day, callback) {
            return function () {
                api.put('/shifts/add').send({
                    shift: shift,
                    day: day
                }).expect(200).end(callback);
            }
        };

        var shifts = [shift1, shift2, shift3];
        shifts.sort(function (a, b) {
            return a.startTime[0] - b.startTime[0] || a.startTime[1] - b.startTime[1];
        });

        function checkShifts() {
            api.get('/shifts').expect(200).end(function (err, res) {
                if (err) throw err;
                var resShifts = res.body.shifts.monday;
                resShifts.sort(function (a, b) {
                    return a.startTime[0] - b.startTime[0] || a.startTime[1] - b.startTime[1];
                });
                var shiftsNoShift1 = shifts.filter(function (shift) {
                    return shift.name !== SHIFT1_NAME;
                });
                chaiObjEquality.containsEqualProps(shiftsNoShift1, resShifts);
                done();
            });
        }

        function deleteShift(callback) {
            return function () {
                api.delete('/shifts').send({
                    dayName: 'monday',
                    shiftName: SHIFT1_NAME
                }).expect(200).end(callback);
            }
        }

        var createShift3 = apiCreateShift(shift3, 'monday', deleteShift(checkShifts));
        var createShift2 = apiCreateShift(shift2, 'monday', createShift3);
        var createShift1 = apiCreateShift(shift1, 'monday', createShift2);
        createShift1();

    });

})
;
