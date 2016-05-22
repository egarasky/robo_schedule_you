import {COOK_ROLE} from "./employees-stub";
import {WAITER_ROLE} from "./employees-stub";
import {HOST_ROLE} from "./employees-stub";
import {ITemplateScheduleProperties, ITemplateShift} from "../../schedule/template/template_schedule_interfaces";

export const BLANK_TEMPLATE_SCHEDULE:ITemplateScheduleProperties = {
    name: 'blank template schedule',
    days: [],
    id: 'TS1'
};

export const WEEK_DAY_BREAKFAST_SHIFT:ITemplateShift = {
    id: 'TS1',
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
            organizationRoleId: COOK_ROLE.id,
            howManyNeeded: 1
        },
        {
            id: 'TR2',
            organizationRoleId: WAITER_ROLE.id,
            howManyNeeded: 2
        },
        {
            id: 'TR3',
            organizationRoleId: HOST_ROLE.id,
            howManyNeeded: 1
        }
    ]
};

export const WEEKEND_BREAKFAST_SHIFT:ITemplateShift = {
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
            organizationRoleId: COOK_ROLE.id,
            howManyNeeded: 2
        },
        {
            id: 'TR5',
            organizationRoleId: WAITER_ROLE.id,
            howManyNeeded: 3
        },
    ]
};

export const WEEK_TEMPLATE_SCHEDULE:ITemplateScheduleProperties = {
    id: 'TS2',
    name: 'week schedule with breakfast',
    days: [
        {
            id: 'TD1',
            shifts: [WEEK_DAY_BREAKFAST_SHIFT]
        },{
            id: 'TD2',
            shifts: []
        }]
};

