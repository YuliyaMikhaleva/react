const path = require('path'),
    HTMLplugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');
    getScopedName = require('./getScopedName');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    // какой модуль собирать (index.js)
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        // куда выводить сборку (dist)
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[chunkhash].js',
        publicPath: '/',
    },
    devServer: {
        // настройка сервера
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true,
        },
    },
    module: {
        // настройка всех загрузчиков
        rules: [
            {
                test: /\.jsx?$/,
                //игнорируем папку node_modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.module\.s[ac]ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                ...(isDevelopment ? {
                                    localIdentName: '[path]_[name]_[local]',
                                } : {
                                    getLocalIdent: (context, localIdentName, localName) => (
                                        getScopedName(localName, context.resourcePath)
                                    ),
                                }),
                            },
                            sourceMap: isDevelopment,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module.(sa|sc|c)ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass'),
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'img',
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        //какой файл нужно взять
        new HTMLplugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            //как он будет называться в dist
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
};
