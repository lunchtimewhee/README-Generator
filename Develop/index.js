// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Title: ',
        name: 'Title',       
    },
    {
        type: 'input',
        message: 'Description: ',
        name: 'Description',       
    },
    {
        type: 'input',
        message: 'Installation Instructions: ',
        name: 'Installation',       
    },
    {
        type: 'list',
        message: 'License: ',
        choices: ['MIT','Apache', 'Academic Free License v3.0', 'GNU General Public License v3.0'],
        name: 'License',       
    },
    {
        type: 'input',
        message: 'Usage information: ',
        name: 'Usage',       
    },
    {
        type: 'input',
        message: 'Testing instructions: ',
        name: 'Testing Instructions',       
    },
    {
        type: 'input',
        message: 'Contribution guidelines: ',
        name: 'How to Contribute',       
    },
    {
        type: 'input',
        message: 'Github username: ',
        name: 'Github Username',       
    },
    {
        type: 'input',
        message: 'Email: ',
        name: 'Email',       
    }
];

let answers = []; // let to hold answers

// TODO: Create a function to write README file
const writeToFile = function(fileName, data) {
    let modifiedData = data;
    
    // Create a new file if it is not there, replace the current file if it is there
    fs.writeFile(fileName, `# ${modifiedData[0][0]}\n\n`,(err) =>{
        err ? console.log(err) : console.log(`Wrote to ${fileName} successfully.`);
    });

    const tableOfContentsText = `- [Installation](#installation)\n- [Usage](#usage)\n- [Credits](#credits)\n- [License](#license)\n\n`;

    modifiedData.splice(2,0,[tableOfContentsText,{name:'Table of Contents'}]);
    modifiedData.splice(4,0,[`Github: ${modifiedData[modifiedData.length - 2][0]} Email: ${modifiedData[modifiedData.length - 1][0]}`,{name:'Credits'}])

    modifiedData.slice(1, modifiedData.length - 2).forEach((answer, index) => {
        fs.appendFile(fileName,`## ${answer[1].name}\n${answer[0]}\n\n`,(err) =>{
            err ? console.log(err) : console.log(`Wrote to ${fileName} successfully.`);
        });
    });
};

const askQuestions = async function(){
    // For loop to ask a list of questions and generate a list of answers that will be used for the README File
    for(const question of questions){
        const answer = await inquirer.prompt(question);
        answers.push([answer[question.name],question]);
    };
}

// TODO: Create a function to initialize app
const init = async function() {
    await askQuestions();
    writeToFile('test.md', answers);
}

// Function call to initialize app
init();

