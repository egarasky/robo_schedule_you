import MomentStatic = moment.MomentStatic;
import {IWorkScheduleProperties} from "domain.schedule.work";
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

export const SHORT_WORK_SCHEDULE_START_DATE = moment('2016-02-01', 'YYYY MM DD');
export const SHORT_WORK_SCHEDULE_END_DATE = moment('2016-02-03', 'YYYY MM DD');
export const SHORT_WORK_SCHEDULE:IWorkScheduleProperties = {
    id: WORK_SCHEDULE_ID_1,
    days: [],
    madeFromTemplateScheduleId: 'TS1',
};

export const WEEK_WORK_SCHEDULE_START_DATE = SHORT_WORK_SCHEDULE_START_DATE;
export const WEEK_WORK_SCHEDULE_END_DATE = moment('2016-02-07', 'YYYY MM DD');
export const WEEK_WORK_SCHEDULE:IWorkScheduleProperties = {
    id: WORK_SCHEDULE_ID_2,
    days: [],
    madeFromTemplateScheduleId: 'TS1'
};