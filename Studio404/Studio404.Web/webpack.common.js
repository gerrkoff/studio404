var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: "./ClientApp/index.jsx",
    output:{
        path: path.resolve(__dirname, 'wwwroot'),
        filename: "app.js"
    },
    resolve:{
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options:{
                    presets:["env", "react"],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ]
    }
};