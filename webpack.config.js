module.exports = {
	entry: {
		entry1: './src/homePage.js',
		entry2: './src/Dashboard.js'
	},
	output: {
		path: __dirname + "/public/js",
		filename: "[name].bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
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