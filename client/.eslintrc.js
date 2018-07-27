module.exports = {
  extends: ['react-app', 'standard', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
