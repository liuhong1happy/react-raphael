var webpack = require('webpack');
var path = require('path');

var APP_PATH = path.resolve(__dirname,'./src/index.js');
var BUILD_PATH = path.resolve(__dirname, './');

module.exports = {
  entry:  APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'react-raphael.js', //输出js
	libraryTarget: "umd",
	library: "react-raphael"
  },
  externals: {
	"react": "React",
	"react-dom": "ReactDOM",
	"raphael": "Raphael"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0' ],
      exclude: /node_modules/
    }
    ]
  }
};
