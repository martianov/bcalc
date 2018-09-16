const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/app/main.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          { 
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.tpl.html'
    })
  ]
};
