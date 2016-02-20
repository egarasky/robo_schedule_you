describe.skip('integrated schedule test', function () {
    var START_DATE = "2015-11-10";
    var END_DATE = "2015-11-14";
    var START_DATE2 = "2015-11-15";
    var END_DATE2 = "2015-11-19";

    var EMPTY_SHIFT_SCHEDULE = {
        "friday": [],
        "monday": [],
        "saturday": [],
        "sunday": [],
        "thursday": [],
        "tuesday": [],
        "wednesday": []
    };

    var postSchedule = function (startDate, endDate) {
        return new Promise(function (resolve, reject) {
            api.post('/schedules').send({
                startDate: startDate,
                endDate: endDate
            }).expect(200).end(function (err, res) {
                err ? reject(err) : resolve();
            });
        });
    };

    beforeEach(function (done) {
        var userRemoved = new Promise(function (resolve, reject) {
            User.remove({}, function (err) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });

        var newUser = {
            firstName: 'Jean',
            lastName: 'Claude Van-Damme',
            userName: 'Jeanny',
            password: 'I am the best at karate'
        };

        userRemoved.then(function () {
            api.post('/manager').send({newUser: newUser}).end(function (err, res) {
                if (err) throw err;
                done();
            });
        });
    });


    it('should access empty schedules', function (done) {
        api.get('/schedules').expect(200).end(function (err, res) {
            if (err) throw err;
            expect(res.body.schedules).to.deep.equal([]);
            done();
        });
    });

    it('should create a dated schedule from an empty shift schedule', function (done) {
        var addSchedule = new Promise(function (resolve, reject) {
            api.post('/schedules').send({
                startDate: START_DATE,
                endDate: END_DATE
            }).expect(200).end(function (err, res) {
                err ? reject(err) : resolve();
            });
        });

        addSchedule.then(function () {
            api.get('/schedules').expect(200).end(function (err, res) {
                    expect(res.body.schedules.length).to.be.equal(1);
                    expect(res.body.schedules[0].startDate).to.be.equal((new Date(START_DATE).toISOString()));
                    expect(res.body.schedules[0].endDate).to.be.equal((new Date(END_DATE).toISOString()));
                    chaiObjEquality.containsEqualProps(EMPTY_SHIFT_SCHEDULE, res.body.schedules[0].templateSchedule);
                    done();
                }
            );
        });
    });

    it('should create two dated schedules and retrieve them sorted by start date', function (done) {
        var addDatedSchedule2 = postSchedule(START_DATE2, END_DATE2);
        var addDatedSchedule1 = postSchedule(START_DATE, END_DATE);
        Promise.all([addDatedSchedule2, addDatedSchedule1]).then(function () {
            api.get('/schedules').expect(200).end(function (err, res) {
                expect(res.body.schedules.length).to.be.equal(2);
                expect(res.body.schedules[0].startDate).to.be.equal((new Date(START_DATE).toISOString()));
                expect(res.body.schedules[0].endDate).to.be.equal((new Date(END_DATE).toISOString()));
                chaiObjEquality.containsEqualProps(EMPTY_SHIFT_SCHEDULE, res.body.schedules[0].templateSchedule);

                expect(res.body.schedules[1].startDate).to.be.equal((new Date(START_DATE2).toISOString()));
                expect(res.body.schedules[1].endDate).to.be.equal((new Date(END_DATE2).toISOString()));
                chaiObjEquality.containsEqualProps(EMPTY_SHIFT_SCHEDULE, res.body.schedules[1].templateSchedule);
                done();
            });
        }).error(function (err) {
            throw err;
        });
    });

    it('should add two schedules and delete one', function (done) {
        Promise.all([postSchedule(START_DATE, END_DATE), postSchedule(START_DATE2, END_DATE2)])
            .then(function () {
                return new Promise(function (resolve, reject) {
                    api.get('/schedules').expect(200).end(function (err, res) {
                        expect(res.body.schedules.length).to.be.equal(2);
                        resolve({
                            idToDelete: res.body.schedules[1]._id,
                            idLeft: res.body.schedules[0]._id
                        });
                    });
                });
            }).then(function (scheduleIds) {
            return new Promise(function (resolve, reject) {
                api.delete('/manager/schedules').send({schedule_id: scheduleIds.idToDelete}).expect(200)
                    .end(function (err, res) {
                        resolve(scheduleIds.idLeft);
                    });
            });
        }).then(function (scheduleIdLeft) {
            api.get('/schedules').expect(200).end(function (err, res) {
                var x = 'hi';
                expect(res.body.schedules.length).to.be.equal(1);
                expect(res.body.schedules[0]._id).to.be.equal(scheduleIdLeft);
                done();
            })
        });
    });


    it('should create an empty schedule and update it', function(done){
        expect(true).to.equal(false, "not implemented");
    });

    it('should create an empty schedule and update a single shift', function(done){
        expect(true).to.equal(false, 'not implemented');
    })
    //TODO test delete schedule and adding employees to schedule
});