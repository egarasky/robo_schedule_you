import {IEmployee} from "domain.employee";
import {IEmployeeProperties} from "domain.employee";
import {IRole} from "domain.api";
export class Employee implements IEmployee {
    private _id:string;
    private _firstName:string;
    private _lastName:string;
    private _roles:Array<IRole>;


    constructor(id:string,
                firstName:string,
                lastName:string,
                role:Array<IRole>) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._roles = role;
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