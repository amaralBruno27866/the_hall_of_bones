import js from '@eslint/js'; // Importing the base ESLint configuration for JavaScript
import globals from 'globals'; // Importing global variables for different environments
import react from 'eslint-plugin-react'; // Importing the React plugin for ESLint
import reactHooks from 'eslint-plugin-react-hooks'; // Importing the React Hooks plugin for ESLint
import reactRefresh from 'eslint-plugin-react-refresh'; // Importing the React Refresh plugin for ESLint

export default [
  // Ignore configuration for specific directories or files
  { ignores: ['dist'] }, // Ignore the "dist" directory, which contains build output

  {
    // Apply these settings to all JavaScript and JSX files
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020 syntax
      globals: globals.browser, // Include browser-specific global variables
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX syntax
        sourceType: 'module', // Use ES modules
      },
    },
    settings: { react: { version: '18.3' } }, // Specify the React version for linting
    plugins: {
      react, // Enable React-specific linting rules
      'react-hooks': reactHooks, // Enable linting rules for React Hooks
      'react-refresh': reactRefresh, // Enable linting rules for React Refresh
    },
    rules: {
      // Include recommended rules from various configurations
      ...js.configs.recommended.rules, // Base JavaScript rules
      ...react.configs.recommended.rules, // Recommended React rules
      ...react.configs['jsx-runtime'].rules, // Rules for the new JSX transform
      ...reactHooks.configs.recommended.rules, // Recommended rules for React Hooks

      // Disable the rule that prevents using "target=_blank" without "rel=noopener"
      'react/jsx-no-target-blank': 'off',

      // Warn if components are not exported correctly for React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow exporting constants
      ],
    },
  },
];
