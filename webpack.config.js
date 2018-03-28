const path = require('path');
// https://webpack.js.org/guides/typescript/
module.exports = {
  entry: path.resolve('./front_end/src/app.ts'),
  devtool: 'inline-source-map',
  output: {
    filename: 'wp_bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: [
        'style-loader',
        'css-loader'
        ]
      },
      {
        test: /\.(tsx|ts)?$/, 
        use: [
        'ts-loader'
       ],
       exclude: [
         /node_modules/
       ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }, 
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};