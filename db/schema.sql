DROP IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

-- Departments Table
CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL,
)

-- Roles Table
CREATE TABLE role (
    role_id SERIAL INTEGER KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Employees Table
CREATE TABLE employees (
    employee_id SERIAL INTEGER KEY,
    employee_first_name VARCHAR(30) NOT NULL,
    employee_last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    manager_id INTEGER,
    -- FOREIGN KEY (manager_id) REFERENCES (employee_id) 
)