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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ 
        minimize: true,
        compress:{
            warnings: false
        }
    })
 ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0' ],
      exclude: /node_modules/
    }
    ]
  }
};
