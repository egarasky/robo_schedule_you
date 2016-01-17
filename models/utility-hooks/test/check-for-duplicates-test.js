var noDuplicatesFn = require(projectPath('/models/utility-hooks/check-for-duplicates'));
describe('check for duplicates', function () {
    var DOC_ARRAY_NAME = 'people';
    var PROP_NAME = 'name';
    var duplicateError;

    function ClassRoom() {
        this[DOC_ARRAY_NAME] = [];
        this.noDuplicates = noDuplicatesFn(DOC_ARRAY_NAME, PROP_NAME);
    }

    function callback(error) {
        duplicateError = error;
    }

    beforeEach(function () {
        duplicateError = undefined;
    });

    it('should add two people with different names and find no duplicates', function () {
        var classRoom = new ClassRoom();
        var person1 = {}, person2 = {};
        person1[PROP_NAME] = 'bob';
        person2[PROP_NAME] = 'chris';
        classRoom[DOC_ARRAY_NAME].push(person1, person2);
        classRoom.noDuplicates(callback);
        expect(duplicateError).to.not.be.ok;
    });

    it('should add 5 people with two pairs of matching names', function () {
        var classRoom = new ClassRoom();
        var names = ['bob', 'chris', 'bob', 'chris', 'kathy'];
        var count = 0;
        classRoom[DOC_ARRAY_NAME] = names.map(function (name) {
            var person = {};
            person[PROP_NAME] = name;
            person.count = count++;
            return person;
        });
        classRoom.noDuplicates(callback);
        expect(duplicateError).to.be.ok;
        expect(duplicateError.message).to.equal('Duplicate name');
        expect(duplicateError.chris.length).to.equal(2);
        expect(duplicateError.chris).includes({name: 'chris', count: 3}, {name: 'chris', count: 1});
        expect(duplicateError.bob.length).to.equal(2);
        expect(duplicateError.bob).includes({name: 'bob', count: 0}, {name: 'bob', count: 2});
    })


});