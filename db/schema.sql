DROP IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

-- Departments Table
CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) UNIQUE NOT NULL,
)

-- Roles Table
CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(100) UNIQUE NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

-- Employees Table
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    employee_first_name VARCHAR(100) NOT NULL,
    employee_last_name VARCHAR(100) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id) 
);