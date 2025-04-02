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

// Đọc cấu hình từ file .prettierrc
let prettierOptions;
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
      'tailwind.config.js'
    ]
  },
  {
    files: ['resources/js/**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true
        },
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        process: 'readonly'
      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        alias: {
          map: [
            ['@', './resources/js']
          ],
          extensions: ['.js', '.jsx', '.json']
        }
      }
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': 'warn',
      'prefer-template': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/no-unresolved': 'error'
    }
  }
];
