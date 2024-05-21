#!/usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseid = 50000;
let studentsid = "";
let countinueEnrolled = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "please select an option:\n",
        choices: ["Enroll a student", "Show student status"],
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "please enter your name:",
        });
        let trimmedStudentsName = studentName.ans.trim().toLowerCase();
        console.log(trimmedStudentsName);
        let studentNamecheck = students.map((obj) => obj.name);
        if (studentNamecheck.includes(trimmedStudentsName) === false) {
            if (trimmedStudentsName !== "") {
                baseid++;
                studentsid = "STID" + baseid;
                console.log("\n\t your account has been created");
                console.log(`WELCOME ${trimmedStudentsName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "please select a course",
                    choices: ["IT", "ENGLISH", "COOKING", "DRIVING", "OFFICE BOY"],
                });
                let coursefees = 0;
                switch (course.ans) {
                    case "IT":
                        coursefees = 5000;
                        break;
                    case "ENGLISH":
                        coursefees = 3000;
                        break;
                    case "COOKING":
                        coursefees = 4000;
                        break;
                    case "DRIVING":
                        coursefees = 3500;
                        break;
                    case "OFFICE BOY":
                        coursefees = 2000;
                        break;
                }
                let courseconfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "DO YOU WANT TO ENROLL IN THIS COURSE",
                });
                if (courseconfirm.ans === true) {
                    let Student = new student(studentsid, trimmedStudentsName, [course.ans], coursefees);
                    students.push(Student);
                    console.log("you are enrolled in this course");
                }
            }
            else {
                console.log("invalid name");
            }
        }
        else {
            console.log("This Name is Already Exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNamescheck = students.map((e) => e.name);
            let selectedstudents = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select name",
                choices: studentNamescheck,
            });
            let foundStudent = students.find((Student) => Student.name === selectedstudents.ans);
            console.log("student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record Is Empty");
        }
    }
    let userconfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "DO You Want To Countinue ?",
    });
    if (userconfirm.ans === false) {
        countinueEnrolled = false;
    }
} while (countinueEnrolled);
