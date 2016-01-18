var Schema = require('mongoose').Schema;

var TimeSchema = Schema({
    _id: false,
    hours: {type: Number, min: 0, max: 23, required: true},
    minutes: {type: Number, min: 0, max: 59, required: true}
});

TimeSchema.methods.toJSON = function(){
    return {
        hours: this.hours,
        minutes: this.minutes
    };
};

module.exports = TimeSchema;