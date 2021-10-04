// Including packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// const util = require('util');
const generateMarkdown = require("./utils/generateMarkdown.js");
// const generateLicense = require("./utils/generateLicense.js");

// const writeFileAsync = util.promisify(fs.writeFile);

// Create an array of questions for user input
  const questions = [
    {
      type: "Input",
      name: "name",
      message: "Your Name:",
      default: "KS"
    },
    {
      type: "Input",
      name: "email",
      message: "Your Email:",
      default: "ks@gmail.com"
    },
    {
      type: "Input",
      name: "githubUsername",
      message: "Your GitHub username:",
      default: "KS1"
    },
    {
      type: "Input",
      name: "title",
      message: "Project Title:",
      default: "README Generator"
    },
    {
      type: "list",
      name: "license",
      message: "Select A License:",
      choices: [      
        {
          name: "GNU GPLv3",
          value: "gpl3",
          short: "GNU GPLv3"
        },  
        {
          name: "MIT License",
          value: "mit",
          short: "MIT License"
        },        
        {
          name: "Apache, Version 2.0",
          value: "apache",
          short: "Apache"
        }
              
      ]
    },
    // {
    //     type: "confirm",
    //     name: "generateLicense",
    //     message: "Do you want to generate the license File? ",
    //     default: true
    // },
    {
      type: "input",
      name: "description",
      message: "Project Description:",
      default: `Generate a README file based on user input. 
      Runs in the terminal and prompts the user for information, 
      which is then populated to a README template.`,
      validate: function (answer) {
          if (answer.length < 1) {
              return console.log("A valid project description is required.");
          }
          return true;
      }
    },
    {
      type: "editor",
      name: "installation",
      message: "Installation Instructions:",
      default: `git clone this repo. Run npm init in the terminal`
    },
    {
      type: "input",
      name: "usage",
      message: "Usage Instructions:",
      default: `Run node index.js in the terminal.
                Answer each prompt as thoroughly as possible. 
                Markdown can be used, except for new lines.`
    },
    {
      type: "input",
      name: "contributionGuidelines",
      message: "Contribution Guidelines:",
      default: `Please fork this repo to create your own generator. 
      The README created by this generator is formatted for specific use-cases.`
    },
    {
      type: "input",
      name: "tests",
      message: "How to Run the Tests:",
      default: `No tests available.`
    },
    {
      type: "input",
      name: "screenshot",
      message: "Filename of screenshot:",
      default: `readme-generator-screenshot.png`
    },
    {
        type: "input",
        name: "directory",
        message: "Where should this be saved? (*path name* only): ",
        default: `./output/`
    }
  ];
  
// function to write README file
function writeToFile(path, data) {

  let markdown = generateMarkdown(data);

  if(path !== "") { path += "\\"; }

  // create markdown file
  fs.writeFile(`${path}README.md`, markdown.trim(), (err) =>
    err ? console.error(err) : console.log('Saved README.md')
  );

  // does not work
  // // create license file IF user said "yes"
  // if(data.generateLicense) {
  // 	let lic = generateLicense(data);    
  // 	console.log(lic);
  // 	fs.writeFile(`${path}LICENSE`, lic.trim(), (err) =>
	//     err ? console.error(err) : console.log('Saved LICENSE')
	//   );
  // }
  
}

// Function to initialize app
function init() {
  inquirer.prompt(questions)
    .then(answers => {
      writeToFile(answers.directory, answers);
    })
    .catch(error => {
      if(error.isTtyError) {
        console.error("prompt couldn't be rendered in the current environment");
      } else {
          console.error(error);
      }
    });
}

// Execute init function 
init();
