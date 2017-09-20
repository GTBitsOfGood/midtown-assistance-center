module.exports = {
	entry: {
		entry1: './src/homePage.js',
		entry2: './src/Dashboard.js'
	},
	output: {
		path: __dirname + "/public",
		filename: "[name].bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	}
};