import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
// import nodePlugin from 'eslint-plugin-node';

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['packages/api/**/*.{js,jsx,json,css,md,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
      // node: nodePlugin
      // node plugin commented out because the latest version isn't compatible with eslint v9
    },
    rules: {
      ...tseslint.configs.recommended.rules, // TypeScript recommended rules
      // ...nodePlugin.configs.recommended.rules,
      // Node plugin recommended rules commented out because the latest version isn't compatible with eslint v9
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off',
      'func-names': 'off',
      'no-process-exit': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off'
    }
  },
  {
    files: ['packages/react-app/**/*.{js,jsx,json,css,md,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules, // TypeScript recommended rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
];