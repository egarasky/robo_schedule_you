var repos;
(function (repos) {
    var organization;
    (function (organization) {
        var Promise = require('bluebird');
        class OrganizationRepoImpl {
            constructor(dataSource) {
                this.dataSource = dataSource;
            }
            loadOrganization(id) {
                return new Promise((resolve, reject) => {
                });
            }
            static initFromDataSource(organizationData) {
                return null;
            }
        }
    })(organization = repos.organization || (repos.organization = {}));
})(repos || (repos = {}));
//# sourceMappingURL=organization-repo.js.map