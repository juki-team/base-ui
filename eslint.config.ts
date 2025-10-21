import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: [ '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}' ],
    plugins: {
      js,
      react: pluginReact,
      'react-hooks': reactHooks,
    },
    extends: [ 'js/recommended', pluginReact.configs.flat.recommended! ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  tseslint.configs.recommended,
  { files: [ '**/*.json' ], plugins: { json }, language: 'json/json', extends: [ 'json/recommended' ] },
  { files: [ '**/*.jsonc' ], plugins: { json }, language: 'json/jsonc', extends: [ 'json/recommended' ] },
  { files: [ '**/*.json5' ], plugins: { json }, language: 'json/json5', extends: [ 'json/recommended' ] },
  { files: [ '**/*.md' ], plugins: { markdown }, language: 'markdown/commonmark', extends: [ 'markdown/recommended' ] },
  { files: [ '**/*.css' ], plugins: { css }, language: 'css/css', extends: [ 'css/recommended' ] },
]);
