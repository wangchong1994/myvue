module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    allowElseIf: false,
    'no-bitwise': 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    'func-names': 'off',
    'no-multi-assign': 'off',
    'no-underscore-dangle': 0,
    'default-case': 0,
    'prefer-destructuring': ["error", {"object": false, "array": false}],
    camelcase: 'off',
    'import/no-unresolved': 'off',
    'one-var': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

// https://eslint.org/docs/user-guide/configuring

// module.exports = {
//  root: true,
//  parser: 'babel-eslint',
//  parserOptions: {
//    sourceType: 'module',
//  },
//  env: {
//    browser: true,
//  },
//  extends: 'airbnb-base',
//  // required to lint *.vue files
//  plugins: ['html'],
//  // add your custom rules here
//  rules: {
//    // don't require .vue extension when importing
//    'import/extensions': [
//      'error',
//      {
//        js: 'never',
//        vue: 'never',
//      },
//    ],
//    'import/no-unresolved': [0],
//    // allow optionalDependencies
//    'import/no-extraneous-dependencies': [
//      'error',
//      {
//        optionalDependencies: ['test/unit/index.js'],
//      },
//    ],
//    'linebreak-style': [0, 'unix'],
//    // allow debugger during development
//    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
//    'no-console': [0],
//    'class-methods-use-this': [0],
//    'max-len': [1, 400],
//  },
// };



