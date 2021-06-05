const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "./js/main.js"),
    output: {
        path: path.resolve(__dirname, "./js/dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path]/[name].[ext]",
                        },
                    },
                ],
            }]
    }
};

