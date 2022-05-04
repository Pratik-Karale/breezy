const HtmlWebpackPlugin=require("html-webpack-plugin")
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean:true,

  },
  // mode:"development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:"./src/index.html"
    })
  ]
};