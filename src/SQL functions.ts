import { pool, connectToDb } from './connection.js';
import { QueryResult } from 'pg';
import inquirer from 'inquirer';

await connectToDb();

// View All Roles function
const viewRoles = (): any => {
    pool.query(`Select * FROM role`, (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
          console.table(result);
        }
      });
}

// View All Employees function
const viewEmployees = (): any => {
    pool.query(`Select * FROM employee`, (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
          console.table(result);
        }
      });
}

// Add a Department function
const addDepartment = (): any => {
    inquirer
        .prompt ([{
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?'}])
        .then ((response: any) => {
            pool.query(`INSERT INTO department (department_name) VALUES ($1)`, [response], (err: Error, result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.table(result);
                }
              });
        })
}

// Add a Role function

// Add an Employee function

// Update an employee function

// Update employee managers function

// View employee managers function

// View employees by manager function

// Delete Departments, Roles, or Employees function

// Calculate total budget of a department function

export { viewRoles, viewEmployees, addDepartment };