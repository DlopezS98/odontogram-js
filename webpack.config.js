const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    plugins: [ new HtmlWebpackPlugin({ template: './public/index.html' })],
    devServer: {
        port: 5000
    }
}