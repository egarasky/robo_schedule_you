import {IEmployeeProperties} from "domain.employee";
import {EmployeeKey} from "../employee/employee";
import {IEmployee} from "domain.employee";
import {Employee} from "../employee/employee";
export class EmployeeContainer {
    private employeeMap:{[index: string]: IEmployeeProperties} = {};

    public addEmployee(employeeToAdd:IEmployeeProperties) {
        const employeeValue = this.employeeMap[EmployeeKey.createKey(employeeToAdd)];
        if (employeeValue) {
            if (employeeValue.id === employeeToAdd.id) {
                throw new Error('employee has already been added to organization');//TODO handle with logger, give more information
            } else {
                throw new Error('employee with same first name and last name already exists');
            }
        }
        this.employeeMap[EmployeeKey.createKey(employeeToAdd)] = employeeToAdd;
    }

    public getEmployees():Array<IEmployee> {
        return Object.keys(this.employeeMap).map((employeeKey:string):IEmployee => {
            return Employee.employee(this.employeeMap[employeeKey]);
        });
    }

    public getEmployee(employeeKey:EmployeeKey):IEmployee {
        return this.employeeMap[employeeKey.getKey()];
    }

    addEmployees(_employees:Array<IEmployeeProperties>):void {
        _employees.forEach((_employee:IEmployeeProperties):void => {
            this.addEmployee(_employee);
        });
    }
}