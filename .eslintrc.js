module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-void': 'off',
    'no-undefined': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-prototype-builtins': 'off',
    'no-shadow': 'off',
  },
};
