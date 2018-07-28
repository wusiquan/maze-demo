const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = {
  mode: 'development',

  entry: {
    index: './src/ts/index',
  },
  
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  
  devServer: {
    port: 8080
  },

  devtool: 'cheap-source-map',
  
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', include: path.resolve(__dirname, 'src') },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
        include: path.resolve(__dirname, 'src/styl')
        // use: ExtractTextPlugin.extract({
        //   //fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // }),
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      template: path.resolve(__dirname, 'index.html')
    })

    // dll plugin 暂时不用吧
    // new webpack.DllReferencePlugin({
    //   context: '.',
    //   manifest: require("./dist/bundle.manifest.json"),
    // })
    // new webpack.HotModuleReplacementPlugin()
    // new ExtractTextPlugin('[name].css')
  ]
}