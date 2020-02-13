const axios = require('axios');

// import dependencies
const inquirer = require('inquirer');

const fs = require('fs');

// prompt user for information
inquirer.prompt([
  {
    type: 'input',
    message: 'Github Username',
    name: 'username',
    validate: function(nameInput) {
      if (nameInput) {
        return true;
      }
      return false;
    }
  },
  {
    type: 'input',
    messages: 'What is your email?',
    name: 'email',
    validate: function (emailInput) {
      return (/^.+@.+\..+$/gi.test(emailInput) ? true : false)
    }
  },
  {
    type: 'input',
    message: 'What is the title of your project?',
    name: 'title'
  },
  {
    type: 'input',
    message: 'What is the description of the project?',
    name: 'description'
  },
  {
    type: 'input',
    message: 'What are the steps required to install your project?',
    name: 'installation'
  },
  {
    type: 'input',
    message: 'Please provide user instructions for your project:',
    name: 'usage'
  },
  {
    type: 'checkbox',
    message: 'Please select the license(s) used:',
    name: 'license',
    choices: ['Apache License 2.0', 'GNU GPLv3', 'MIT', 'ISC']
  },
  {
    type: 'input',
    message: 'Name(s) of the people that collaborated on this project',
    name: 'collaborators'
  },
  {
    type: 'input',
    message: 'Please provide instructions for running test:',
    name: 'test'
  }
])
.then(results => {
  var apiLink = `https://api.github.com/users/${results.username}`;
  var licenseString = "";
  for (var b = 0; b < results.license.length; b++) {
    licenseString += "* " + results.license[b] + "\n";
  }
  axios
    .get(apiLink)
    .then(function(githubProfile) {
      // console.log(githubProfile);
      var avatar = githubProfile.data.avatar_url;
      // console.log(avatar);
      var readMe = `
# ${results.title}

![Avatar](${avatar})

### Email
${results.email}

## Description
${results.description}

## Installation
${results.installation}

## Usage
${results.usage}

## Contributing
${results.collaborators}

## Test
${results.test}

## License
${licenseString}

`;
      console.log(readMe);
      
      fs.writeFile('README.md', readMe, writeResults => {
        if (writeResults) {
          console.log(writeResults);
        }
      });
    });
});

