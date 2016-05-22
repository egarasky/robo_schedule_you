import {IOrganizationProperties} from "../../organization/organization_interfaces";

const ROLE_COOK = {
    id: "R1",
    name: "cook"
};
const ROLE_WAITER = {
    id: "R2",
    name: "waiter"
};
const ROLE_HOST = {
    id: "R3",
    name: "host"
};
const ROLE_DISH_WASHER = {
    id: "R4",
    name: "dish washer"
};
export const ORGANIZATION:IOrganizationProperties = {
    id: "O1",
    name: "Bob's Burgers",
    employees: [],
    roles: [ROLE_COOK, ROLE_WAITER, ROLE_HOST, ROLE_DISH_WASHER],
    templateSchedules: [],
    workSchedules: []
};