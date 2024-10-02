// Imports all the necessary dependencies & functions
import inquirer from 'inquirer';
import { connectToDb } from './connection.js';
import { viewDepartments, 
        viewRoles, 
        viewEmployees, 
        addDepartment, 
        addRole, 
        addEmployee, 
        updateEmployee, 
        updateManagers, 
        viewManagers, 
        viewEmployeesByManager, 
        deleteStuff, 
        totalDepartmentBudget 
} from './SQL functions.js';

await connectToDb();

// Function that lets you choose what to do with Departments, Roles, Employees
// Calls functions that are defined in SQL_functions.js
export const companyActions = (): any => {
    inquirer
        .prompt ([{
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Update employee managers',
                    'View employee managers',
                    'View employees by manager',
                    'Delete departments, roles, or employees',
                    'Calculate total budget of a department'
                ],
            },
        ])
        .then ((answer: any) => {
            if (answer.action === 'View all departments') {
                viewDepartments();
            } else if (answer.action === 'View all roles') {
                viewRoles();
            } else if (answer.action === 'View all employees') {
                viewEmployees();
            } else if (answer.action === 'Add a department') {
                addDepartment();
            } else if (answer.action === 'Add a role') {
                addRole();
            } else if (answer.action === 'Add an employee') {
                addEmployee();
            } else if (answer.action === 'Update an employee role') {
                updateEmployee();
            } else if (answer.action === 'Update employee managers') {
                updateManagers();
            } else if (answer.action === 'View employee managers') {
                viewManagers();
            } else if (answer.action === 'View employees by manager') {
                viewEmployeesByManager();
            } else if (answer.action === 'Delete departments, roles, or employees') {
                deleteStuff();
            } else if (answer.action === 'Calculate total budget of a department') {
                totalDepartmentBudget();
            }
        })
};

companyActions();