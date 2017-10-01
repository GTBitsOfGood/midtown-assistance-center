module.exports = {
	entry: {
		entry1: './src/HomePage.jsx',
		entry2: './src/Dashboard.jsx'
	},
	output: {
		path: __dirname + "/public/js",
		filename: "[name].bundle.js"
	},
	module: {
		loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
			{
        test: /\.css$/,
        loader: 'style-loader'
      },
			{
				 test: /\.css$/,
				 loader: 'css-loader',
				 query: {
				   modules: true,
				   localIdentName: '[name]__[local]___[hash:base64:5]'
				}
			}
		]
	}
};