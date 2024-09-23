import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['packages/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off',
      'func-names': 'off',
      'no-process-exit': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off',
    },
    overrides: [
      {
        files: ['packages/api/**/*.ts'],
        env: {
            'node': true
        },
        extends: [
            'plugin:node/recommended'
        ]
      },
      {
        files: ['packages/react-app/**/*.{ts,tsx}'],
        env: {
            'browser': true
        },
        settings: {
          'react': {
            'version': 'detect'
          }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
        ],
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ]
        }
      }
    ]
  },
);