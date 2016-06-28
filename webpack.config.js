var webpack = require('webpack')
var path = require('path')

var PRODUCTION = process.env.NODE_ENV == 'production'

var entry = {
  jsx: PRODUCTION ? './bakan.js' : './index.js',
  html: './index.html'
}

var output = {
  path: path.join(__dirname, './dist'),
  filename: 'index.js'
}

var plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
  })
]

if(PRODUCTION){
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
  output.library = 'Bakan'
  output.libraryTarget = 'umd'

  delete entry.html
}else{
  plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'))
}

module.exports = {
  context: path.join(__dirname, './src'),
  entry: entry,
  output: output,
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  devServer: {
    contentBase: './src',
    hot: true
  }
}
