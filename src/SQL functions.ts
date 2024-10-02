// Imports all the necessary dependencies & functions
import { pool } from './connection.js';
import { QueryResult } from 'pg';
import inquirer from 'inquirer';
import { companyActions } from './index.js';

// 'View All Departments' function
const viewDepartments = (): any => {
    pool.query(`Select * FROM department`, (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
            console.log('\n')
            console.table(result.rows);
            companyActions();
        }
      });
}

// 'View All Roles' function
const viewRoles = (): any => {
    pool.query(`Select * FROM role`, (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
            console.log('\n');
            console.table(result.rows);
            companyActions();
        }
      });
}

// 'View All Employees' function
const viewEmployees = (): any => {
    pool.query(`Select * FROM employee`, (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
            console.log('\n')
            console.table(result.rows);
            companyActions();
        }
      });
}

// 'Add a Department' function
const addDepartment = (): any => {
    inquirer
        .prompt ([{
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?'}])
        .then ((response: any) => {
            pool.query(`INSERT INTO department (department_name) VALUES ($1)`, [response.department], (err: Error, result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.table(result.rows);
                  viewDepartments();
                }
              });
        })
}

// Retrieve Department Names Function
// Used in Add a Role Function
const getAllDepartments: Promise<any> = new Promise((resolve, reject) => {
    pool.query(`SELECT department_name FROM department`, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
            reject(err);
        }
       resolve (result.rows.map(obj => obj['department_name'])); 
    })
})

// Retrieve Department IDs Function
// Used in Add a Role Function
function getDepartmentId(department:string): Promise<any> {
    return new Promise((resolve, reject) => {
    pool.query(`SELECT department_id FROM department WHERE department_name = $1`, [department], (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
            reject(err);
        } resolve (result.rows.map(obj => obj.department_id)[0]);
    })
})}

// Add a Role function
const addRole = async (): Promise<any> => {
    let departments: any = await getAllDepartments;
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
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'To what department does this role belong?',
                choices: departments
            }
        ])
        .then (async (response: any) => {
            const deptId: any = await getDepartmentId(response.roleDepartment);
            pool.query(`INSERT INTO role (role_title, role_salary, department_id) VALUES ($1, $2, $3)`, [response.role, response.roleSalary, deptId], (err: Error, result: QueryResult) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(result.rows);
                            viewRoles();
                        }}); 
        })
}

// Retrieve Employee Names Function
// Used in Add an Employee Function
const getAllEmployees: Promise<any> = new Promise((resolve, reject) => {
    pool.query(`SELECT employee_first_name, employee_last_name FROM employee`, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
            reject(err);
        }
       resolve (result.rows.map(obj => obj['employee_first_name'])); 
    })
})

// Retrieve All Roles Function
// Used in Add an Employee Function
const getAllRoles: Promise<any> = new Promise((resolve, reject) => {
    pool.query(`SELECT role_title FROM role`, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
            reject(err);
        }
       resolve (result.rows.map(obj => obj['role_title'])); 
    })
})

// Retrieve Employee IDs Function
// Used in Add an Employee Function
function getEmployeeId(employee:string): Promise<any> {
    return new Promise((resolve, reject) => {
    pool.query(`SELECT employee_id FROM employee WHERE employee_first_name = $1`, [employee], (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
            reject(err);
        } resolve (result.rows.map(obj => obj.employee_id)[0]);
    })
})}

// Retrieve Role IDs Function
// Used in Add an Employee Function
function getRoleId(role:string): Promise<any> {
    return new Promise((resolve, reject) => {
    pool.query(`SELECT role_id FROM role WHERE role_title = $1`, [role], (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
            reject(err);
        } resolve (result.rows.map(obj => obj.role_id)[0]);
    })
})}

// Add an Employee function
const addEmployee = async (): Promise<any> => {
    let employee: any = await getAllEmployees;
    let role: any = await getAllRoles;
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
                type: 'list',
                name: 'employeeRole',
                message: 'What is the role of the new employee?',
                choices: role,
            },
            {
                type: 'list',
                name: 'managerList',
                message: 'Who is their manager?',
                choices: employee,
            }
        ])
        .then (async (response: any) => {
            const managerId: any = await getEmployeeId(response.managerList);
            const roleId: any = await getRoleId(response.employeeRole);
            pool.query(`INSERT INTO employee (employee_first_name, employee_last_name, role_id, manager_id ) VALUES ($1, $2, $3, $4)`, [response.firstName, response.lastName, roleId, managerId], (err: Error, result: QueryResult) => {
                     if (err) {
                    console.log(err);
                    } else {
                    console.table(result.rows);
                    viewEmployees();
                    }
                });
        })
}

// Update an Employee function
const updateEmployee = async (): Promise<any> => {
    let employee: any = await getAllEmployees;
    let role: any = await getAllRoles;
    inquirer
        .prompt ([{
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: employee,
            },
            {
                type: 'list',
                name: 'updateRole',
                message: 'What is their new role?',
                choices: role,
            },
        ])
        .then (async (response: any) => {
            const employeeId: any = await getEmployeeId(response.updateEmployee);
            const roleId: any = await getRoleId(response.updateRole);
            pool.query(`UPDATE employee SET role_id = $2 WHERE employee_id = $1`, [employeeId, roleId], (err: Error, result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.table(result.rows);
                  viewEmployees();
                }
              });
        })
}

// Update Employee Managers function
const updateManagers = async (): Promise<any> => {
    let employee: any = await getAllEmployees;
    inquirer
        .prompt ([{
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: employee,
            },
            {
                type: 'list',
                name: 'updateManager',
                message: 'Who is their new manager?',
                choices: employee,
            },
        ])
        .then (async (response: any) => {
            const employeeId: any = await getEmployeeId(response.updateEmployee);
            const managerId: any = await getEmployeeId(response.updateManager);
            pool.query(`UPDATE employee SET manager_id = $2 WHERE employee_id = $1`, [employeeId, managerId], (err: Error, result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.table(result.rows);
                  viewEmployees();
                }
              });
        })
}

// View Employee Managers function
// STILL WORKING ON --------------------------------------------------->
const viewManagers = (): any => {
        pool.query(`SELECT manager_id FROM employee GROUP BY employee_id`, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
            }
          });
}

// View Employees by Manager function
// STILL WORKING ON --------------------------------------------------->
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
const deleteStuff = async (): Promise<any> => {
    let department: any = await getAllDepartments;
    let role: any = await getAllRoles;
    let employee: any = await getAllEmployees;
    inquirer
    .prompt ([{
            type: 'list',
            name: 'table',
            message: 'Select something to delete',
            choices: ['department', 'role', 'employee']
        },
    ])
    .then ((response: any) => {
        if (response.table === 'department') {
            inquirer
            .prompt ([{
                type: 'list',
                name: 'department',
                message: 'Which department would you like to delete?',
                choices: department,
            }])
            .then (async (response: any) => {
                const departmentId: any = await getDepartmentId(response.department);
                pool.query(`DELETE FROM department WHERE department_id = $1`, [departmentId], (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result.rows);
                        viewDepartments();
                    }
                  });
            })
        }
        if (response.table === 'role') {
            inquirer
            .prompt ([{
                type: 'list',
                name: 'role',
                message: 'Which role would you like to delete?',
                choices: role,
            }])
            .then (async (response: any) => {
                const roleId: any = await getRoleId(response.role);
                pool.query(`DELETE FROM role WHERE role_id = $1`, [roleId], (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result.rows);
                        viewRoles();
                    }
                  });
            })
        }
        if (response.table === 'employee') {
            inquirer
            .prompt ([{
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to delete?',
                choices: employee,
            }])
            .then (async (response: any) => {
                const employee: any = await getEmployeeId(response.employee);
                pool.query(`DELETE FROM employee WHERE employee_id = $1`, [employee], (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result.rows);
                        viewEmployees();
                    }
                  });
            })
        }
    })
}

// Calculate Total Budget of a Department function
// STILL WORKING ON --------------------------------------------------->
const totalDepartmentBudget = async (): Promise<any> => {
    const department: any = await getAllDepartments;
    inquirer
    .prompt ([{
            type: 'list',
            name: 'totalBudget',
            message: 'Pick a department to view its total budget',
            choices: department,
        },
    ])
    .then ((response: any) => {
        pool.query(`SELECT department, SUM(role_salary) AS sum_department FROM role GROUP BY $1`, [response.department], (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
            }
          });
    })
}

export { viewDepartments, 
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
    totalDepartmentBudget };