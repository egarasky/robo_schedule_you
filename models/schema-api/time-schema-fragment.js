var Schema = require('mongoose').Schema;

module.exports = function TimeSchema() {
    return new Schema({
        _id: false,
        hour: {type: Number, required: true, min: 0, max: 23},
        minute: {type: Number, required: true, min: 0, max: 59}
    });
};//TODO deprecate and replace with date

