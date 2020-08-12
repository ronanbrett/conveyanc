/* eslint-disable */

const path = require('path');

const requireField = fieldName => {
  return value => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }
    return true;
  };
};

const cwd = () => {
  return __dirname;
};

module.exports = plop => {
  plop.addHelper('cwd', p => process.cwd());

  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: `{{cwd}}/{{pascalCase name}}/{{pascalCase name}}.ts`,
        templateFile: '.plops/Component/Component.ts.hbs',
      },
      {
        type: 'add',
        path: `{{cwd}}/{{pascalCase name}}/{{pascalCase name}}.vue`,
        templateFile: '.plops/Component/Component.vue.hbs',
      },
      {
        type: 'add',
        path: `{{cwd}}/{{pascalCase name}}/{{pascalCase name}}.test.ts`,
        templateFile: '.plops/Component/Component.test.ts.hbs',
      },
    ],
  });
};
