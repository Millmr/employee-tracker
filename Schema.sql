DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department( 
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
, name VARCHAR(30)
);

CREATE TABLE role(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
, title VARCHAR(30)
, salary DECIMAL
, department_id INTEGER
,FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
, first_name VARCHAR(30)
, last_name VARCHAR(30)
, manager_id INTEGER
, role_id INTEGER
, FOREIGN KEY (role_id) REFERENCES role(id)
, FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department(name)
VALUE ("Sales");
INSERT INTO department(name)
VALUE ("Engineering");
INSERT INTO department(name)
VALUE ("Finance");
INSERT INTO department(name)
VALUE ("Legal");

INSERT INTO role(title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role(title, salary, department_id)
VALUE ("Software Engineer", 130000, 2);
INSERT INTO role(title, salary, department_id)
VALUE ("Sales Manager", 110000, 1);
INSERT INTO role(title, salary, department_id)
VALUE ("Salesperson", 90000, 1);
INSERT INTO role(title, salary, department_id)
VALUE ("Acountant", 145000, 3);
INSERT INTO role(title, salary, department_id)
VALUE ("Legal Assistant", 65000, 4);
INSERT INTO role(title, salary, department_id)
VALUE ("Attorney", 200000, 4);

INSERT INTO employee(first_name, last_name, manager_id, role_id)
Value ("Meghan", "Buntin", null, 1);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
Value ("Justin", "Miller", 1, 2);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
Value ("Jordyn", "Lepley", null, 3);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
Value ("Nick", "Siddens", 2, 4);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
Value ("Corbin", "Haskin", null, 5);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
Value ("Crystine", "Taylor", null, 6);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
Value ("Bowen", "Wayne", null, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
SET GLOBAL FOREIGN_KEY_CHECKS=0;
