SELECT employee_id, employee_first_name, employee_last_name, employee.role_id, manager_id, role_title, role_salary, department_name
FROM employee
JOIN role ON employee.role_id = role.role_id
JOIN department ON role.department_id = department.department_id