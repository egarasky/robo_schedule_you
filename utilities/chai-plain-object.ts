import {IPlainObject} from "../api/plain-object";
export var PlainObject = (_chai:any, utils:any) => {
    var Assertion = _chai.Assertion;

    function chainPlainObject() {
        utils.flag(this, 'plainObject', true);
    }

    function assertPlainObject(plainObject:IPlainObject) {
        var subject = this._obj;//subject of assertion
        if (utils.flag(this, 'plainObject')) {
            
        }
    }

    


    }


    //moment compare as string
    // Assertion.addChainableMethod('plainObjects')
    // chai.Assertion.addChainableMethod('equalTime', function(time) {
    //     var expected = time.getTime(),
    //         actual = this._obj.getTime();
    //
    //     return this.assert(
    //         actual == expected,
    //         'expected ' + this._obj + ' to equal ' + time,
    //         'expected ' + this._obj + ' to not equal ' + time
    //     );
    // });