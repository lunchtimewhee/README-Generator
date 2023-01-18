// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Object containing links to badges
const badgeLinks = {
    apache: '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',

    bsd2: '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)',

    bsd3: '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',

    gpl: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',

    lgpl: '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)',

    mit: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',

    mozilla: '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',

    eclipse:'[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)', 
};

const licenses = {
    apache:'Apache License 2.0',
    bsd2: 'BSD 2-Clause Simplified or FreeBSD license',
    bsd3: 'BSD 3-Clause New or Revised license',
    gpl: 'GNU General Public License (GPL)',
    lgpl: 'GNU Library or Lesser Public License',
    mit: 'MIT License',
    mozilla: 'Mozzila Public License 2.0',
    eclipse: 'Eclipse Public License version 2.0'
};

const licenseList = Object.keys(licenses);



// Array for questions
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
        type: 'editor',
        message: 'Installation Instructions: ',
        name: 'Installation Instructions',       
    },
    {
        type: 'editor',
        message: 'Usage information: ',
        name: 'Usage Information',       
    },
    {
        type: 'list',
        message: 'License: ',
        choices: licenseList,
        name: 'License',       
    },
    {
        type: 'editor',
        message: 'Contribution guidelines: ',
        name: 'Contribution Guidelines',       
    },
    {
        type: 'editor',
        message: 'Testing instructions: ',
        name: 'Testing Instructions',       
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
    },
   
];



let answers = []; // let to hold answers

// Function to write data to given fileName
const writeToFile = function(fileName, data) {
    let modifiedData = data;
    
    // Create a new file if it is not there, replace the current file if it is there
    fs.writeFile(fileName, `# ${modifiedData[0][1]}\n\n`,(err) =>{
        err ? console.log(err) : console.log(`Wrote to ${fileName} successfully.`);
    });

    // Create Table of Contents
    let tableOfContentsText = ''

    modifiedData.forEach((question, index) => {
        if(index === 0){
            tableOfContentsText = `${tableOfContentsText} - [${question[1]}](#${question[1].toLowerCase().split(' ').join('-')})\n`
        }
        else if(question[0] === 'Github Username'){
            tableOfContentsText = `${tableOfContentsText} - [Questions?](#questions?)\n`
        }
        else if(question[0] === 'Email'){

        }
        else{
            tableOfContentsText = `${tableOfContentsText} - [${question[0]}](#${question[0].toLowerCase().split(' ').join('-')})\n`
        }
    });

    console.log(modifiedData);
    // Modify answers data to insert Table of Contents and consolidate Github user and Email for Credits
    modifiedData.splice(2,0,['Table of Contents',tableOfContentsText]); 
    modifiedData.splice(4,0,['Questions?',`- Github: https://github.com/${modifiedData[modifiedData.length - 2][1]} \n- Email: ${modifiedData[modifiedData.length - 1][1]}`])
    console.log(modifiedData);

    // Go through each answer in modifiedData and add the header + contents into the README file
    modifiedData.slice(1, modifiedData.length - 2).forEach((answer, index) => {
        if(answer[0] === 'License'){
            answer[1] = badgeLinks[answer[1]];
        }
        fs.appendFile(fileName,`## ${answer[0]}\n${answer[1]}\n\n`,(err) =>{
            err ? console.log(err) : console.log(`Wrote to ${fileName} successfully.`);
        });
    });
};

const askQuestions = async function(){
    // Generate a list of answers that will be used for the README File
    const rawAnswers = await inquirer.prompt(questions);
    answers = Object.entries(rawAnswers);
};

// TODO: Create a function to initialize app
const init = async function() {
    await askQuestions();
    writeToFile('README.md', answers);
};

// Function call to initialize app
init();
