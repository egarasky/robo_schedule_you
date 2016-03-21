"use strict";
var employees_stub_1 = require("./employees-stub");
var employees_stub_2 = require("./employees-stub");
var employees_stub_3 = require("./employees-stub");
exports.BLANK_TEMPLATE_SCHEDULE = {
    name: 'blank template schedule',
    days: [],
    id: 'TS1'
};
exports.WEEK_DAY_BREAKFAST_SHIFT = {
    id: 'TShift1',
    name: 'Week Day Breakfast',
    startTime: {
        hour: 6,
        minute: 30
    },
    endTime: {
        hour: 10,
        minute: 30
    },
    roles: [
        {
            id: 'TR1',
            organizationRoleId: employees_stub_1.COOK_ROLE.id,
            howManyNeeded: 1
        },
        {
            id: 'TR2',
            organizationRoleId: employees_stub_2.WAITER_ROLE.id,
            howManyNeeded: 2
        },
        {
            id: 'TR3',
            organizationRoleId: employees_stub_3.HOST_ROLE.id,
            howManyNeeded: 1
        }
    ]
};
exports.WEEKEND_BREAKFAST_SHIFT = {
    id: 'TShift2',
    name: 'Weekend Breakfast',
    startTime: {
        hour: 8,
        minute: 0
    },
    endTime: {
        hour: 12,
        minute: 30
    },
    roles: [
        {
            id: 'TR4',
            organizationRoleId: employees_stub_1.COOK_ROLE.id,
            howManyNeeded: 2
        },
        {
            id: 'TR5',
            organizationRoleId: employees_stub_2.WAITER_ROLE.id,
            howManyNeeded: 3
        },
    ]
};
exports.WEEK_TEMPLATE_SCHEDULE = {
    id: 'TS2',
    name: 'week schedule with breakfast',
    days: [
        {
            id: 'TD1TS2',
            shifts: [exports.WEEK_DAY_BREAKFAST_SHIFT]
        }]
};
//# sourceMappingURL=template-schedule-stub.js.map