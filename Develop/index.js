// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');



// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Title: ',
        name: 'title',       
    },
    {
        type: 'input',
        message: 'Description: ',
        name: 'description',       
    },
    {
        type: 'input',
        message: 'Installation Instructions: ',
        name: 'installation-instructions',       
    },
    {
        type: 'input',
        message: 'Usage information: ',
        name: 'usage-information',       
    },
    {
        type: 'input',
        message: 'Contribution guidelines: ',
        name: 'contribution-guidelines',       
    },
    {
        type: 'input',
        message: 'Testing instructions: ',
        name: 'testing-instructions',       
    },
    {
        type: 'list',
        message: 'License: ',
        choices: ['MIT','Apache', 'Academic Free License v3.0', 'GNU General Public License v3.0'],
        name: 'license',       
    },
    {
        type: 'input',
        message: 'Github username: ',
        name: 'github-username',       
    },
    {
        type: 'input',
        message: 'Email: ',
        name: 'email',       
    }
];

let answers = [];

// TODO: Create a function to write README file
async function writeToFile(fileName, data) {


    for(const question of questions){
        const answer = await inquirer.prompt(question);
        answers.push(answer);
    }

    console.log(answers);
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
writeToFile('.txt', 'xxx')
