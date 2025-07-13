const path = require('path');

module.exports = {
    entry: {
        rapidcrm: path.resolve(__dirname, "spa/src/App.jsx"),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                            "@babel/preset-env",
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [
                                    require("tailwindcss"),
                                    require("autoprefixer"),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    }
};
