const ESLintPlugin = require('eslint-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const pkj = require('./package.json')

const FILENAME = `${pkj.name}.lib.js`
const INPUT_PATH = path.resolve(__dirname, 'src')
const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => ({
  entry: INPUT_PATH,
  target: 'node',
  devtool: argv.mode === 'development' ? 'inline-source-map' : 'source-map',
  // __dirname issue: global __dirname differed
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    filename: FILENAME,
    path: OUTPUT_PATH,
    publicPath: OUTPUT_PATH,
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'config.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin()
  ],
})