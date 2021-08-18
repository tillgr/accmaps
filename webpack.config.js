const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        main: [path.resolve(__dirname, "./src/main.ts"), path.resolve(__dirname, "./src/ui.ts")],
        style: path.resolve(__dirname, "./src/style.ts")
    },
    output: {
        path: path.resolve(__dirname, "./public/dist"),
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

