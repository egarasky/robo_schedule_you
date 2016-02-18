var repos;
(function (repos) {
    var organization;
    (function (organization) {
        var Promise = require('bluebird');
        var OrganizationRepoImpl = (function () {
            function OrganizationRepoImpl(dataSource) {
                this.dataSource = dataSource;
            }
            OrganizationRepoImpl.prototype.loadOrganization = function (id) {
                //TODO typescript Promises bluebird
                return new Promise(function (resolve, reject) {
                    //this.dataSource.loadOrganization(id, {})
                    //    .then((organizationData:IOrganizationData) => {
                    //        resolve(new Organization(organizationData));
                    //    });
                });
            };
            //TODO left off intialize domain api roles, workSchedules etc from data in initFromDataSource...not constructor
            OrganizationRepoImpl.initFromDataSource = function (organizationData) {
                //const roles = _.map(organizationData.roles, (role:IRoleData)=> Role.initFromDataSource(role));
                //const workSchedules = _.map(organizationData.workSchedules,
                //    (workScheduleData:IWorkScheduleData) => {
                //        return new WorkSchedule(
                //            workScheduleData.id,
                //
                //        )
                //    });
                //
                //const templateSchedules = _.map(organizationData.templateSchedules,
                //    (templateScheduleData:ITemplateScheduleData) =>;
                //
                //return new Organization(organizationData.id, roles, workSchedules,
                //    templateSchedules,
                //    organizationData.employees);
                return null;
            };
            return OrganizationRepoImpl;
        })();
    })(organization = repos.organization || (repos.organization = {}));
})(repos || (repos = {}));
//# sourceMappingURL=organization-repo.js.map