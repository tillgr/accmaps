const path = require('path');

module.exports = {
    mode: "development",
    entry: [path.resolve(__dirname, "./js/main.ts"), path.resolve(__dirname, "./js/ui.ts")],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};

