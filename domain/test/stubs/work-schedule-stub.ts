import MomentStatic = moment.MomentStatic;
import {DATE_FORMAT} from "../../api/api_interfaces";
import {IWorkScheduleProperties} from "../../schedule/work/work_schedule_interfaces";
export const WORK_SCHEDULE_ID_1 = 'WS1';
export const WORK_SCHEDULE_ID_2 = 'WS2';
export const WORK_SCHEDULE_ID_3 = 'WS3';
export const WORK_SCHEDULE_ID_4 = 'WS4';
export const WORK_SCHEDULE_ID_5 = 'WS5';
export const WORK_SCHEDULE_IDS = [
    WORK_SCHEDULE_ID_1,
    WORK_SCHEDULE_ID_2,
    WORK_SCHEDULE_ID_3,
    WORK_SCHEDULE_ID_4,
    WORK_SCHEDULE_ID_5
];

var moment:MomentStatic = require('moment');

export const SHORT_WORK_SCHEDULE_START_DATE = moment('2016-02-01', DATE_FORMAT);
export const SHORT_WORK_SCHEDULE_END_DATE = moment('2016-02-02', DATE_FORMAT);
export const SHORT_WORK_SCHEDULE:IWorkScheduleProperties = {
    id: WORK_SCHEDULE_ID_1,
    days: [
        {
            date: SHORT_WORK_SCHEDULE_START_DATE,
            id: "WDAY1",
            shifts: [
                {
                    endTime: {
                        hour: 10,
                        minute: 30
                    },
                    id: "WSHFT1",
                    roles: [
                        {
                            employees: [],
                            howManyNeeded: 1,
                            id: "WROLE1",
                            organizationRoleId: "TR1"
                        },
                        {
                            employees: [],
                            howManyNeeded: 2,
                            id: "WROLE2",
                            organizationRoleId: "TR2"
                        },
                        {
                            employees: [],
                            howManyNeeded: 1,
                            id: "WROLE3",
                            organizationRoleId: "TR3"
                        }
                    ],
                    startTime: {
                        hour: 6,
                        minute: 30
                    }
                }
            ]
        }
    ],
    madeFromTemplateScheduleId: 'TS2',
};

export const WEEK_WORK_SCHEDULE_START_DATE = SHORT_WORK_SCHEDULE_START_DATE;
export const WEEK_WORK_SCHEDULE_END_DATE = moment('2016-02-07', 'YYYY MM DD');
export const WEEK_WORK_SCHEDULE:IWorkScheduleProperties = {
    id: WORK_SCHEDULE_ID_2,
    days: [],
    madeFromTemplateScheduleId: 'TS2'
};