const path = require("path");

const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + " is required";
    }
    return true;
  };
};

const cwd = () => {
  return __dirname;
};

module.exports = (plop) => {
  plop.addHelper("cwd", (p) => process.cwd());

  plop.setGenerator("globalComponent", {
    description: "Create a Global component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: ".plops/Component/Component.tsx.hbs",
      },
      {
        type: "add",
        path:
          "src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: ".plops/Component/Component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: ".plops/Component/Component.test.tsx.hbs",
      },
      {
        type: "add",
        path:
          "src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss",
        templateFile: ".plops/Component/Component.scss.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.tsx",
        templateFile: ".plops/Component/index.tsx.hbs",
      },

      {
        // Adds an index.tsx file if it does not already exist
        type: "add",
        path: "src/components/index.tsx",
        templateFile: ".plops/injectable-index.tsx.hbs",
        // If index.tsx already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: "append",
        path: "src/components/index.tsx",
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      },
      {
        type: "append",
        path: "src/components/index.tsx",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });

  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{cwd}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: ".plops/Component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}//{{pascalCase name}}/{{pascalCase name}}.module.scss",
        templateFile: ".plops/Component/Component.scss.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: ".plops/Component/Component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: ".plops/Component/Component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{pascalCase name}}/index.tsx",
        templateFile: ".plops/Component/index.tsx.hbs",
      },
      {
        // Adds an index.tsx file if it does not already exist
        type: "add",
        path: "{{cwd}}/index.tsx",
        templateFile: ".plops/injectable-index.tsx.hbs",
        // If index.tsx already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: "append",
        path: "{{cwd}}/index.tsx",
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      },
      {
        type: "append",
        path: "{{cwd}}/index.tsx",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });

  plop.setGenerator("scene", {
    description: "Create a scene",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your scene name?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/scenes/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: ".plops/Scene/Scene.tsx.hbs",
      },
      {
        type: "add",
        path: "src/scenes/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: ".plops/Scene/Scene.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "src/scenes/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: ".plops/Scene/Scene.test.tsx.hbs",
      },
      {
        type: "add",
        path: "src/scenes/{{pascalCase name}}/index.tsx",
        templateFile: ".plops/Scene/index.tsx.hbs",
      },
      {
        type: "add",
        path: "src/scenes/index.tsx",
        templateFile: ".plops/injectable-index.tsx.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/scenes/index.tsx",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      },
      {
        type: "append",
        path: "src/scenes/index.tsx",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });

  plop.setGenerator("service", {
    description: "Create service",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your service name?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/services/{{camelCase name}}.tsx",
        templateFile: ".plops/service.tsx.hbs",
      },
      {
        type: "add",
        path: "src/services/index.tsx",
        templateFile: ".plops/injectable-index.tsx.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/services/index.tsx",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase name}}';`,
      },
      {
        type: "append",
        path: "src/services/index.tsx",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{camelCase name}},`,
      },
    ],
  });

  plop.setGenerator("hook", {
    description: "Create a custom react hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your hook name?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/hooks/{{camelCase name}}.tsx",
        templateFile: ".plops/hook.tsx.hbs",
      },
      {
        type: "add",
        path: "src/hooks/index.tsx",
        templateFile: ".plops/injectable-index.tsx.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/hooks/index.tsx",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase name}}';`,
      },
      {
        type: "append",
        path: "src/hooks/index.tsx",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{camelCase name}},`,
      },
    ],
  });
};
