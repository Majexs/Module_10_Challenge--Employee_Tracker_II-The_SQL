import inquirer from 'inquirer';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import { viewRoles, viewEmployees, addDepartment } from './SQL functions.js';

await connectToDb();

const companyActions = (): void => {
inquirer
    .prompt ([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments',
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
        if (answer.action === 'View all roles') {
            await viewRoles();
            companyActions();
        } else if (answer.action === 'View all employees') {
            await viewEmployees();
            companyActions();
        } else if (answer.action === 'Add a department') {
            await addDepartment();
            companyActions();
        } else if (answer.action === 'Add a role') {
            await addDepartment();
            companyActions();
        } else if (answer.action === 'Add an employee') {
            
            companyActions();
        } else if (answer.action === 'Update an employee') {

            companyActions();
        } else if (answer.action === 'Update employee managers') {

            companyActions();
        } else if (answer.action === 'View employee managers') {

            companyActions();
        } else if (answer.action === 'View employees by manager') {

            companyActions();
        } else if (answer.action === 'Delete departments, roles, or employees') {

            companyActions();
        } else if (answer.action === 'Calculate total budget of a department') {

            companyActions();
        }
    })
};

companyActions();