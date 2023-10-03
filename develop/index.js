// required dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
const db = require('./db');

// function to initialize program
function init() {
    inquirer.prompt([{

            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: [
                {name: "view all departments", value: "ALL_DEPARTMENTS"},
                {name: "view all roles", value: "ALL_ROLES"},
                {name: "view all employees", value: "ALL_EMPLOYEES"},
                {name: "add a department", value: "ADD_DEPARTMENT"},
                {name: "add a role", value: "ADD_ROLE"},
                {name: "add an employee", value: "ADD_EMPLOYEE"},
                {name: "update an employee role", value: "UPDATE_EMPLOYEE_ROLE"},
            ],
    }
]).then((answers) => {
    console.log(answers);
    const userChoice = answers.choices;
    if (userChoice === "view all departments") {
       db.query("SELECT * FROM department", (err, results) => {
            if (err) throw err;
              console.table(results);
       });
    } else if (userChoice === "view all roles") {
        db.query("SELECT * FROM role", (err, results) => {
            if (err) throw err;
            console.table(results);
        });
    } else if (userChoice === "view all employees") {
        db.query("SELECT * FROM employee", (err, results) => {
            if (err) throw err;
            console.table(results);
        });
  }
    else if (userChoice === "add a department") {
        inquirer.prompt([{
            type: "input",
            name: "department",
            message: "What is the name of the department you would like to add?",
        }]).then((answers) => {
            const department = answers.department;
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const values = [department, sql];

            db.query(sql, values, (err, results) => {
                if (err) throw err;
                console.table(results);
            }
            );
        }); 
        
    } else if (userChoice === "add a role") {
        inquirer.prompt([{
            type: "input",
            name: "roleID",
            message: "Enter the role you would like to add.",
        },
        { 
            type: "input",
            name: "salary",
            message: "Enter the salary of the role you would like to add.",
        },
        {
            type: "input",
            name: "departmentID",
            message: "Enter the department ID of the role you would like to add.",
        }
        ]).then((answers) => {
            const roleID = answers.roleID;
            const sql = `INSERT INTO role (title) VALUES (?)`;
            const values = [roleID, sql];

            db.query(sql, values, (err, results) => {
                if (err) throw err;
                console.table(results);
            }
            );
        });
    } else if (userChoice === "add an employee") {
        inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "Enter the first name of the employee you would like to add.",
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the last name of the employee you would like to add.",
        },
        {
            type: "input",
            name: "roleID",
            message: "Enter the role ID of the employee you would like to add.",
        },
        {
            type: "input",
            name: "managerID",
            message: "Enter the manager ID of the employee you would like to add.",
        }
    ]).then((answers) => {
        const firstName = answers.firstName;
        const lastName = answers.lastName;
        const roleID = answers.roleID;
        const managerID = answers.managerID;
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const values = [firstName, lastName, roleID, managerID, sql];

        db.query(sql, values, (err, results) => {
            if (err) throw err;
            console.table(results);
        }
        );
    });

    } else if (userChoice === "update an employee role") {
        inquirer.prompt([{
            type: "input",
            name: "employeeID",
            message: "Enter the ID of the employee you would like to update.",
        },
        {
            type: "input",
            name: "roleID",
            message: "Enter the role ID of the employee you would like to update.",
        }
    ]).then((answers) => {
        const employeeID = answers.employeeID;
        const roleID = answers.roleID;
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const values = [roleID, employeeID,];

        db.query(sql, values, (err, results) => {
            if (err) throw err;
            console.table(results);
            db.end();
        }
        );
    });
    }
});
}

  init();