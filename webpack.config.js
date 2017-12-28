const path = require('path');
const webpack = require('webpack');

let config = {
  entry: {
    background: './src/background.js',
    options: './src/options.js',
    //piazzaURLGetter: './src/piazzaURLGetter.js',
    replaceWithPiazzaLinks: './src/replaceWithPiazzaLinks.js',
    //utility: './src/utility.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
};

module.exports = config;
