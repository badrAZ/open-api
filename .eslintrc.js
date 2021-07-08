const path = require('path')

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    babelOptions: {
      configFile: path.resolve(__dirname, '.babelrc'),
    },
  },
  rules: {},
}