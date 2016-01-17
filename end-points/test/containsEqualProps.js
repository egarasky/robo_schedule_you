var chai = require('chai');
var expect = chai.expect;


var chaiObjectEquality = {};
//in all b is supposed to contain a
//goal is to see if b not only contains all of a's properties but those
//properties have equal values too
function copyContainedObjectProps(a, b) {
    var bOnlyAProps = Array.isArray(a) ? [] : {};
    var keyProps = Object.keys(a).map(function (key) {
        var bValue;
        if (a[key] instanceof Object && b[key] instanceof Object) {
            bValue = copyContainedObjectProps(a[key], b[key]);
        } else {
            bValue = b[key];
        }
        return [key, bValue];
    });

    keyProps.forEach(function (keyProp) {
        bOnlyAProps[keyProp[0]] = keyProp[1];
    });
    return bOnlyAProps;
}

function objectsContainEqualProps(a, b) {
    var bOnlyAProps = copyContainedObjectProps(a, b);
    chai.config.truncateThreshold = 0;
    expect(a).to.deep.equal(bOnlyAProps);
}
chaiObjectEquality.containsEqualProps = function containsEqualProps(a, b) {
    expect(a).to.be.an.instanceof(Object);
    expect(b).to.be.an.instanceOf(Object);
    if (a instanceof Array && b instanceof Array) {
        expect(a.length).to.equal(b.length, 'expected arrays to be equal length');
        a.forEach(function (obj, index) {
            containsEqualProps(obj, b[index]);
        });
    } else if(a instanceof Object && b instanceof Object) {
        objectsContainEqualProps(a, b);
    } else {
        var message = a instanceof Array ? 'Array, Parameter 2 is Object' : 'Object, Parameter 2 is Array';
        expect(false).to.equal(true, 'Parameter 1 is ' + message);
    }

};


module.exports = chaiObjectEquality;