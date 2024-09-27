INSERT INTO department (department_name)
VALUES  ('Management'),
        ('Sales'),
        ('Accounting'),
        ('Human Resources'),
        ('Reception'),
        ('Production Oversight'),
        ('Warehouse');

INSERT INTO role (role_title, role_salary, department_id)
VALUES  ('Regional Manager', 100000, 1),
        ('Salesperson', 80000, 2),
        ('Receptionist', 40000, 5),
        ('Customer Service Representative', 50000, 4),
        ('Lead Accountant', 70000, 3),
        ('Assistant to the Regional Manager', 80000, 2),
        ('Junior Accountant', 60000, 3),
        ('Quality Assurance Representative', 50000, 6),
        ('Warehouse Manager', 60000, 7);

INSERT INTO employee (employee_first_name, employee_last_name, role_id, manager_id)
VALUES  ('Michael', 'Scott', 1, NULL),
        ('Jim', 'Halpert', 2, 1),
        ('Pam', 'Beesly', 3, 1),
        ('Dwight', 'Shrute', 2, 1),
        ('Andy', 'Bernard', 2, 1),
        ('Karen', 'Filipelli', 2, 1),
        ('Angela', 'Martin', 5, 1),
        ('Stanley', 'Hudson', 8, 1),
        ('Kevin', 'Malone', 7, 7),
        ('Meredith', 'Palmer', 8, 1);