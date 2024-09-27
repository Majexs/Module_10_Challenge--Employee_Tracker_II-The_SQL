// Imports all the necessary dependencies & functions
import inquirer from 'inquirer';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee, updateManagers, viewManagers, viewEmployeesByManager, deleteStuff, totalDepartmentBudget } from './SQL functions.js';

await connectToDb();

// Function that lets you choose what to do with Departments, Roles, Employees
const companyActions = (): void => {
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
                'Update an employee',
                'Update employee managers',
                'View employee managers',
                'View employees by manager',
                'Delete departments, roles, or employees',
                'Calculate total budget of a department'
            ],
        },
    ])
    .then (async (answer: any) => {
        if (answer.action === 'View all departments') {
            await viewDepartments();
            companyActions();
        } else if (answer.action === 'View all roles') {
            await viewRoles();
            companyActions();
        } else if (answer.action === 'View all employees') {
            await viewEmployees();
            companyActions();
        } else if (answer.action === 'Add a department') {
            await addDepartment();
            companyActions();
        } else if (answer.action === 'Add a role') {
            await addRole();
            companyActions();
        } else if (answer.action === 'Add an employee') {
            await addEmployee();
            companyActions();
        } else if (answer.action === 'Update an employee') {
            await updateEmployee();
            companyActions();
        } else if (answer.action === 'Update employee managers') {
            await updateManagers();
            companyActions();
        } else if (answer.action === 'View employee managers') {
            await viewManagers();
            companyActions();
        } else if (answer.action === 'View employees by manager') {
            viewEmployeesByManager();
            companyActions();
        } else if (answer.action === 'Delete departments, roles, or employees') {
            await deleteStuff();
            companyActions();
        } else if (answer.action === 'Calculate total budget of a department') {
            await totalDepartmentBudget();
            companyActions();
        }
    })
};

companyActions();