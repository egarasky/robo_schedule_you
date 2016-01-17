var mongoose = require('mongoose');
module.exports = mongoose.Schema({
    _id: false,
    name: {type: String, required: true},
    startTime: {type: Date, _id: false, required: true},
    endTime: {type: Date, _id: false, required: true},
    roles: {
        _id: false
    },
    employees: []
});