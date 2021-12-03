const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true, // enable global strict mode
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    alias: {
      map: [['@', path.resolve(__dirname, './src')]],
      extensions: ['.ts', '.js', '.jsx', '.json', '.tsx'],
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  plugins: ['react-hooks', 'promise', 'prettier', '@typescript-eslint'],
  rules: {
<<<<<<< HEAD
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // 0 - off, 1 - warn, 2 - error
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-curly-newline': 0,
    'react/prop-types': 0,
    'import/extensions': 0,
    'react/jsx-filename-extension': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-console': 0,
    'no-shadow': 0,
    'react/jsx-props-no-spreading': 0,
    'prefer-promise-reject-errors': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-nested-ternary': 0,
    /**
     * @description rules of eslint-plugin-prettier
     */
    // https://prettier.io/docs/en/options.html
    'prettier/prettier': 'error',
    'no-useless-escape': 0,
    'no-throw-literal': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'react/jsx-wrap-multilines': 0,
    'import/prefer-default-export': 0,
    'react/button-has-type': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/media-has-caption': 0,
    'no-return-assign': 0,
    'react/forbid-prop-types': 0,
    'no-unused-vars': 0, // ts中的type/interface
    'no-plusplus': 0,
=======
    // 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-debugger': 0,
    eqeqeq: 2,
    'default-case': 1,
    'no-empty-function': 1,
    'no-multi-spaces': 1,
    'spaced-comment': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 3 }],
>>>>>>> 410f661 (Fix the problem of lint reporting errors)
  },
};
