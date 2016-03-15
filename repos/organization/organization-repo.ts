//
//import {IOrganizationRepo} from "./organization-repo";
//import {IOrganizationDataSource} from "./organization-repo";
//import {IOrganization} from "domain.organization";
//import {IOrganizationData} from "./organization-repo";
//var Promise:PromiseConstructor = require('bluebird');
//class OrganizationRepoImpl implements IOrganizationRepo {
//
//    constructor(private dataSource:IOrganizationDataSource) {
//
//    }
//
//
//    loadOrganization(id:string):Promise<IOrganization> {
//        //TODO typescript Promises bluebird
//
//        return new Promise<IOrganization>((resolve, reject) => {
//
//            //this.dataSource.loadOrganization(id, {})
//            //    .then((organizationData:IOrganizationData) => {
//            //        resolve(new Organization(organizationData));
//            //    });
//        });
//    }
//
//    //TODO left off intialize domain api roles, workSchedules etc from data in initFromDataSource...not constructor
//    static initFromDataSource(organizationData:IOrganizationData):IOrganization {
//
//
//        //const roles = _.map(organizationData.roles, (role:IRoleData)=> Role.initFromDataSource(role));
//        //const workSchedules = _.map(organizationData.workSchedules,
//        //    (workScheduleData:IWorkScheduleData) => {
//        //        return new WorkSchedule(
//        //            workScheduleData.id,
//        //
//        //        )
//        //    });
//        //
//        //const templateSchedules = _.map(organizationData.templateSchedules,
//        //    (templateScheduleData:ITemplateScheduleData) =>;
//        //
//        //return new Organization(organizationData.id, roles, workSchedules,
//        //    templateSchedules,
//        //    organizationData.employees);
//        return null;
//    }
//}
////    var organizationQuery;
////    module.exports = function (OrganizationRepoStub) {
////    organizationQuery = new OrganizationRepoStub();
////    return function (organizationId, fields) {
////        return new Promise(function (resolve, reject) {
////            organizationQuery.loadOrganization(organizationId, fields)
////                .then(function (organization) {
////                    var createdOrganization = Object.create(Organization.prototype);
////                    _.extendOwn(createdOrganization, organization);//validate organization
////
////                    resolve(createdOrganization);
////
////                });
////        });
////    }
