const config = require('config');
const fs = require('fs');
const path = require('path');

fs.writeFileSync(
    path.resolve(__dirname, 'config/client.json'),
    JSON.stringify(config)
);

module.exports = {
    entry: {
        entry1: './src/home/HomePage.jsx',
        entry2: './src/dash/Dashboard.jsx'
    },
    output: {
        path: __dirname + '/public/js',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2016', 'react']
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
    },
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
        }
    ],
    resolve: {
        alias: {
            config: path.resolve(__dirname, 'config/client.json')
        }
    }
};
