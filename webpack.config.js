const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "./js/main.js"),
    output: {
        path: path.resolve(__dirname, "./js/dist"),
        filename: "[name].js",
    },
    module: {
        rules: [{test: /\.css$/, use: ["style-loader", "css-loader"]}]
    }
};

