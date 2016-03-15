import {IEmployeeProperties} from "domain.employee";
import {EmployeeKey} from "../employee/employee";
import {IEmployee} from "domain.employee";
import {Employee} from "../employee/employee";
export class EmployeeContainer {
    private employeeMap:{[index: string]: IEmployeeProperties} = {};
    private employeeNameChecker:{[index:string]: string} = {};

    public addEmployee(employeeToAdd:IEmployeeProperties) {
        const matchingIdEmployee = this.employeeMap[employeeToAdd.id];
        const nameKey = this.nameKey(employeeToAdd);
        if (matchingIdEmployee) {
            throw new Error('employee with same id has already been added to organization');//TODO handle with logger, give more information
        } else if(this.employeeNameChecker[nameKey]){
            throw new Error('employee with same name is already a part of the organization');
        }
        this.employeeMap[employeeToAdd.id] = employeeToAdd;
        this.employeeNameChecker[this.nameKey(employeeToAdd)] = employeeToAdd.lastName + employeeToAdd.firstName;
    }

    private nameKey(employeeToAdd) {
        return employeeToAdd.lastName + employeeToAdd.firstName;
    };

    public getEmployees():Array<IEmployee> {
        return Object.keys(this.employeeMap).map((employeeKey:string):IEmployee => {
            return Employee.employee(this.employeeMap[employeeKey]);
        });
    }

    public getEmployee(employeeId:string):IEmployee {
        return this.employeeMap[employeeId];
    }

    addEmployees(_employees:Array<IEmployeeProperties>):void {
        _employees.forEach((_employee:IEmployeeProperties):void => {
            this.addEmployee(_employee);
        });
    }

    removeEmployee(id:string):IEmployeeProperties {
        //TODO throw error if employee doesn't exist
        var employeeToDelete = this.employeeMap[id];
        delete this.employeeNameChecker[this.nameKey(employeeToDelete)];
        delete this.employeeMap[id];
        return employeeToDelete;
    }
}
