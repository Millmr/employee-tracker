const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Millmr1',
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

const runSearch = () => {
    inquirer
        .prompt({
            name: "choice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View Employees by Role',
                'View Employees by department',
                'Add an Employee',
                'Add a Role',
                'Add a Department',
                'Update Employee'
            ]
        })
        .then((answer) => {
            switch (answer.choice) {
                case 'View All Employees':
                    viewEmployees();
                    break;

                case 'View Employees by Role':
                    viewRoles();
                    break;

                case 'View Employees by department':
                    viewDepartments();
                    break;

                case 'Add an Employee':
                    addEmployee();
                    break;

                case 'Add a Role':
                    addRole();
                    break;

                case 'Add a Department':
                    addDepartment();
                    break;

                case 'Update Employee':
                    updateEmployee();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
};

const viewEmployees = () => {
    const query = 
    'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, " " ,e.last_name) AS Manager From employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        runSearch();
    })
};

const viewRoles = () => {
    const query =
    'SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        runSearch();
    })
}

const viewDepartments = () => {
    const query =
    'SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        runSearch();
    })
}

var roleArr = [];

const selectRole = () => {
    const query =
    'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

var manageArr = [];

const selectManage = () => {
    const query =
    'SELECT first_name, last_name FROM employee WHERE manager_id IS NULL';
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            manageArr.push(res[i].first_name);
        }
    })
    return manageArr;
}

const addEmployee = () => {
    inquirer
        .prompt([{
            name: "firstname",
            message: "What is the employee's first name?"
        },
        {
            name: "lastname",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: selectRole()
        },
        {
            name: "manage",
            type: "rawlist",
            message: "Who is the employee's manager?",
            choices: selectManage()
        }
    ]).then(function (val) {
            var roleId = selectRole().indexOf(val.role) + 1
            var managerId = selectManage().indexOf(val.choice) + 1
            connection.query("INSERT INTO employee SET ?", 
            {
                first_name: val.firstname,
                last_name: val.lastname,
                manager_id: managerId,
                role_id: roleId
                
            }, function(err){
                if (err) throw err
                console.table(val)
                runSearch()
            })
        })
        
}

const addRole = () => {
    const query =
    'SELECT role.title AS Title, role.salary AS Salary FROM role';
    connection.query(query, (err, res) => {
        inquirer
            .prompt([{
                name: "Title",
                message: "What is the role?"
            },
            {
                name: "Salary",
                message: "what is the Salary"
            }])
            .then((res) => {
                connection.query("INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    runSearch();
                })
            })
    })
}

const addDepartment = () => {
    inquirer
        .prompt([{
            name: "name",
            message: "What Department would you like to add?"
        }]).then((res) => {
            connection.query("INSERT INTO department SET ?",
            {
                name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runSearch();
            })
        })
}
        

const updateEmployee = () => {
    const query =
    'SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res)
        inquirer
            .prompt([{
                name: "lastName",
                type: "rawlist",
                choices: () => {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name? ",
            },
        {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new role?",
            choices: selectRole()
        }])
        .then((res) => {
            var roleId = selectRole().indexOf(res.role) + 1
            connection.query("UPDATE employee SET WHERE ?",
            {
                last_name: res.lastName
            },
            {
                role_id: roleId
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runSearch();
            })
        })
    })
}