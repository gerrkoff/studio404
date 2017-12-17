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
                loader: 'style-loader!css-loader'
            }
        ]
    }
};