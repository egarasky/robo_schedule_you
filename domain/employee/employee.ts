import {IEmployeeProperties, IEmployee} from "./employee_interfaces";
import {IRole} from "../api/api_interfaces";
import _ = require('underscore');

export class Employee implements IEmployee {
    private _id:string;
    private _firstName:string;
    private _lastName:string;
    private _roles:Array<IRole>;


    constructor(idOrEmployeeObject:string | IEmployeeProperties,
                firstName?:string,
                lastName?:string,
                role?:Array<IRole>) {
        if (_.isString(idOrEmployeeObject)) {
            this._id = <string> idOrEmployeeObject;
            this._firstName = firstName;
            this._lastName = lastName;
            this._roles = role;
        } else {
            let employeeObj:IEmployeeProperties = <IEmployeeProperties> idOrEmployeeObject;
            this._id = employeeObj.id;
            this._firstName = employeeObj.firstName;
            this._lastName = employeeObj.lastName;
            this._roles = employeeObj.roles;
        }
    }

    public static employee(employeeObj:IEmployeeProperties):IEmployee {
        return new Employee(employeeObj.id, employeeObj.firstName, employeeObj.lastName, employeeObj.roles);
    }

    get id():string {
        return this._id;
    }

    get firstName():string {
        return this._firstName;
    }

    get lastName():string {
        return this._lastName;
    }

    get roles():Array<IRole> {
        return this._roles;
    }

}

export class EmployeeKey {
    private key:string;

    constructor(employee:IEmployeeProperties) {
        this.key = EmployeeKey.createKey(employee);
    }

    public static createKey(employee:IEmployeeProperties) {
        return employee.firstName + employee.lastName;
    }

    public getKey():string {
        return this.key;
    }

}

