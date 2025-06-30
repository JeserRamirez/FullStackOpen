import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignorar archivos
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      '**/*.config.js',
      '**/vite.config.js',
      '**/eslint.config.js',
    ],
  },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Tus reglas personalizadas:
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // React Refresh para HMR
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Configuración específica para tests de Vitest
  {
    files: ['**/*.test.{js,jsx}'],
    plugins: {
      'vitest-globals': vitestGlobals,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...vitestGlobals.configs.recommended.rules,
    },
  },
]
