var webpack = require('webpack');
var path = require('path');

var APP_PATH = path.resolve(__dirname,'./src/main.js');
var BUILD_PATH = path.resolve(__dirname, './');

module.exports = {
  entry: {
    "react-raphael": APP_PATH,
	"vendor": ['react','react-dom','raphael']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js' //输出js
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'vendor.js'}),
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
