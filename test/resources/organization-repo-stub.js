(function () {
    var _ = require('underscore');
    var Promise = require('bluebird');

    var OrganizationRepoStub = function (organizations) {
        this.ROLE_1_ID = 'cookroleid';
        this.ROLE_NAME_1_COOK = 'cook';
        this.ROLE_COOK = {
            _id: this.ROLE_1_ID,
            roleName: this.ROLE_NAME_1_COOK
        };

        this.ROLE_2_ID = 'waiterroleid';
        this.ROLE_NAME_2_WAITER = 'waiter';
        this.ROLE_WAITER = {
            _id: this.ROLE_2_ID,
            roleName: this.ROLE_NAME_2_WAITER
        };


        this.ORGANIZATION_1_ID = 'organization1id';
        this.ORGANIZATION_1_NAME = 'bigOrgCorp';
        this.ORGANIZATION_1 = {
            _id: this.ORGANIZATION_1_ID,
            roles: [this.ROLE_WAITER, this.ROLE_COOK],
            organizationName: this.ORGANIZATION_1_NAME
        };

        this.organizations = _.extend({}, organizations);
        this.organizations[this.ORGANIZATION_1_ID] = this.ORGANIZATION_1;
        this.loadOrganization = function loadOrganization(organizationId) {
            var self = this;
            return new Promise(function (resolve, reject) {
                resolve(self.organizations[organizationId]);
            });
        };

        this.TEMPLATE_SHIFT_1_ID = 'templateshift1id';
        this.TEMPLATE_SHIFT_1_NAME = 'breakfast';
        this.TEMPLATE_SHIFT_1_START_TIME = [6, 30];
        this.TEMPLATE_SHIFT_1_END_TIME = [12, 0];
        this.TEMPLATE_SHIFT_1_ROLES = [{
            organizationRoleId: this.ROLE_1_ID,
            howManyNeeded: 4
        }, {
            organizationRoleId: this.ROLE_2_ID,
            howManyNeeded: 6
        }];

        this.TEMPLATE_SHIFT_1 = {
            _id: this.TEMPLATE_SCHEDULE_1_ID,
            name: this.TEMPLATE_SHIFT_1_NAME,
            startTime: this.TEMPLATE_SHIFT_1_START_TIME,
            endTime: this.TEMPLATE_SHIFT_1_END_TIME,
            roles: this.TEMPLATE_SHIFT_1_ROLES
        };

        this.TEMPLATE_SHIFT_2_ID = 'templateshift2id';
        this.TEMPLATE_SHIFT_2_NAME = 'lunch and dinner';
        this.TEMPLATE_SHIFT_2_START_TIME = [12, 0];
        this.TEMPLATE_SHIFT_2_END_TIME = [8, 0];
        this.TEMPLATE_SHIFT_2_ROLES = [{
            organizationRoleId: this.ROLE_1_ID,
            howManyNeeded: 6
        }, {
            organizationRoleId: this.ROLE_2_ID,
            howManyNeeded: 8
        }];

        this.TEMPLATE_SHIFT_2 = {
            _id: this.TEMPLATE_SHIFT_2_ID,
            name: this.TEMPLATE_SHIFT_2_NAME,
            startTime: this.TEMPLATE_SHIFT_2_START_TIME,
            endTime: this.TEMPLATE_SHIFT_2_END_TIME,
            roles: this.TEMPLATE_SHIFT_2_ROLES
        };

        this.TEMPLATE_SCHEDULE_1_ID = 'templateschedule1id';
        this.DAY_1_ID = 'day1id';
        this.DAY_2_ID = 'day2id';
        this.TEMPLATE_SCHEDULE_1 = {
            _id: this.TEMPLATE_SCHEDULE_1_ID,
            days: [
                {
                    _id: this.DAY_1_ID,
                    shifts: [this.TEMPLATE_SHIFT_1, this.TEMPLATE_SHIFT_2]
                },{
                    _id: this.DAY_2_ID,
                    shifts: [this.TEMPLATE_SHIFT_2]
                }
            ]
        };
    };

    module.exports = OrganizationRepoStub;
})();