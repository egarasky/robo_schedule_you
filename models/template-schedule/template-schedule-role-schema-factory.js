module.exports = (function () {
    var mongoose = require('mongoose');
    return function () {
        var templateRoleSchema = mongoose.Schema({
            _id: false,
            organizationRoleId: {type: mongoose.Schema.Types.ObjectId, required: true},
            howManyNeeded: {type: Number, required: true, min: 0}
        });
        templateRoleSchema.methods.toJSON = function toJSON(){
            return {
                organizationRoleId: this.organizationRoleId.toString(),
                howManyNeeded: this.howManyNeeded
            };
        }
        return templateRoleSchema;
    }
})();