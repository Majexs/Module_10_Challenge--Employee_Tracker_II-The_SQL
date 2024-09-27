// Imports all the necessary dependencies & functions
import { pool, connectToDb } from './connection.js';
import { QueryResult } from 'pg';
import inquirer from 'inquirer';

await connectToDb();

// View All Roles function
const viewDepartments = (): any => {
    pool.query(`Select * FROM department`, (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
          console.table(result);
        }
      });
}

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
const addRole = (): any => {
    inquirer
        .prompt ([{
                type: 'input',
                name: 'role',
                message: 'What is the name of the new role?'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the new role?'
            }
        ])
        .then ((response: any) => {
            pool.query(`INSERT INTO role (role_title, role_salary) VALUES ($1, $2)`, [response], (err: Error, result: QueryResult) => {
                if (isNaN(response.roleSalary)) {
                    console.log('Please enter salary as a number.')
                } else if (err) {
                    console.log(err);
                } else {
                    console.table(result);
                }
              });
        })
}

// Add an Employee function
// NEED TO REWORK THIS ONE
const addEmployee = (): any => {
    inquirer
        .prompt ([{
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the new employee?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the new employee?',
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: 'What is the role of the new employee?',
            },
            {
                type: 'input',
                name: 'managerLast',
                message: 'Last name of manager of New Employee?',
            }
        ])
        .then ((response: any) => {
            pool.query(`INSERT INTO employee (employee_first_name, employee_last_name, manager_id ) VALUES ($1, $2, $3, $4.employee_id)`, [response], (err: Error, result: QueryResult) => {
                     if (err) {
                    console.log(err);
                    } else {
                    console.table(result);
                    }
                });
        })
}

// Update an Employee function
// WORK ON THIS ONE TOO
const updateEmployee = (): any => {
    inquirer
        .prompt ([{
                type: 'input',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
            },
            {
                type: 'input',
                name: 'updateRole',
                message: 'What is their new role?',
            },
        ])
        .then ((response: any) => {
            pool.query(`UPDATE employee SET role_id = $2 WHERE id = role_title`, [response], (err: Error, result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.table(result);
                }
              });
        })
}

// Update Employee Managers function
// WORK ON THIS TOO
const updateManagers = (): any => {
    inquirer
    .prompt ([{
            type: 'input',
            name: 'employee',
            message: 'Which employee should we select?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their new manager?'
        }
    ])
    .then ((response: any) => {
        pool.query(`INSERT INTO employee (role_title, role_salary) VALUES ($1, $2)`, [response], (err: Error, result: QueryResult) => {
            if (isNaN(response.roleSalary)) {
                console.log('Please enter salary as a number.')
            } else if (err) {
                console.log(err);
            } else {
                console.table(result);
            }
          });
    })
}

// View Employee Managers function
// WORK ON WTF DO I DO
const viewManagers = (): any => {
        pool.query(`SELECT employee GROUP BY manager_id`, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result);
            }
          });
}

// View Employees by Manager function
const viewEmployeesByManager = (): any => {
    pool.query(`SELECT employee GROUP BY manager_id`, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
        }
      });
}

// Delete Departments, Roles, or Employees function
// WORK ON LATER I'M TIRED
const deleteStuff = (): any => {
    inquirer
    .prompt ([{
            type: 'list',
            name: 'table',
            message: 'Select something to delete',
            choices: ['department', 'role', 'employee']
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their new manager?'
        }
    ])
    .then ((response: any) => {
        pool.query(`INSERT INTO employee (role_title, role_salary) VALUES ($1, $2)`, [response], (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result);
            }
          });
    })
}

// Calculate Total Budget of a Department function
// GTFO I CAN'T EVEN LOOK AT THIS NOW
const totalDepartmentBudget = (): any => {

}

export { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee, updateManagers, viewManagers, viewEmployeesByManager, deleteStuff, totalDepartmentBudget };