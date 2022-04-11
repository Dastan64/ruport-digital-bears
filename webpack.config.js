const path = require("path");

//! Примечание: если в какой-то момент изображения перестали отображаться, то нужно просто нажать Ctrl + S/сохранить index.html, и всё вернётся на круги своя


//Плагины
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, //очищать dist перед повторным npm run build
        assetModuleFilename: 'assets/images/[name][ext]', //если название папки с картинками другое, не забудьте поменять
        environment: {
            arrowFunction: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "autoprefixer"
                                ],
                            ],
                        },
                    },
                }, "group-css-media-queries-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-arrow-functions"],
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html',
    }), new MiniCssExtractPlugin()],
    devServer: {
        watchFiles: ["src/*.html"]
    }
};