// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true
  },
  extends: ['standard', 'prettier'],
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html', '.ejs']
  },
  // add your custom rules here
  rules: {
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
