var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: "./ClientApp/index.jsx",
    devtool: 'source-map',
    output:{
        path: path.resolve(__dirname, 'wwwroot'),
        filename: "app.js"
    },
    resolve:{
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("0.0.5.0"),
            MOCKSERVER: true
        })
    ],
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options:{
                    presets:["env", "react"]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};