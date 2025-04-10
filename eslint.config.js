import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

import babelParser from '@babel/eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let prettierOptions = {};
try {
  prettierOptions = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
  );
} catch (e) {
  console.error('Không thể đọc file .prettierrc:', e);
  prettierOptions = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    tabWidth: 2,
  };
}

export default [
  {
    ignores: [
      '**/vendor/**',
      '**/node_modules/**',
      '**/*.php',
      '**/*.blade.php',
      'public/**',
      'storage/**',
      'bootstrap/**',
      'config/**',
      'database/**',
      'routes/**',
      'tests/**',
      'artisan',
      'server.php',
      '.eslintrc.js',
      'vite.config.js',
      'postcss.config.js',
      'tailwind.config.js',
    ],
  },
  {
    files: ['resources/js/**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        process: 'readonly',
        route: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [['@', './resources/js']],
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'prettier/prettier': ['error', prettierOptions],
      'arrow-body-style': [2, 'as-needed'],
      'class-methods-use-this': 0,
      'import/imports-first': 0,
      'import/newline-after-import': 0,
      'import/no-dynamic-require': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-named-as-default': 0,
      'import/no-unresolved': 0,
      'import/no-webpack-loader-syntax': 0,
      'import/prefer-default-export': 0,
      'no-undef': 'error',
      'react/jsx-no-undef': 'error',
      indent: [
        2,
        2,
        {
          SwitchCase: 1,
        },
      ],
      'jsx-a11y/aria-props': 2,
      'jsx-a11y/heading-has-content': 0,
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          // NOTE: If this error triggers, either disable it or add
          // your custom components, labels and attributes via these options
          // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
          controlComponents: ['Input'],
        },
      ],
      'jsx-a11y/label-has-for': 0,
      'jsx-a11y/mouse-events-have-key-events': 2,
      'jsx-a11y/role-has-required-aria-props': 2,
      'jsx-a11y/role-supports-aria-props': 2,
      'max-len': 0,
      'newline-per-chained-call': 0,
      'no-confusing-arrow': 0,
      'no-console': 1,
      'no-unused-vars': 2,
      'no-use-before-define': 0,
      'prefer-template': 2,
      'react/destructuring-assignment': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-closing-tag-location': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-first-prop-new-line': [2, 'multiline'],
      'react/jsx-filename-extension': 0,
      'react/jsx-no-target-blank': 0,
      'react/jsx-uses-vars': 2,
      'react/require-default-props': 0,
      'react/require-extension': 0,
      'react/self-closing-comp': 0,
      'react/sort-comp': 0,
      'require-yield': 0,
    },
  },
];
