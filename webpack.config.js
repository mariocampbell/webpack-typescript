const HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      Dotenv = require('dotenv-webpack'),
      path = require('path')

module.exports = { 

    devtool: 'inline-source-map',

    entry: path.join(__dirname, 'src', 'app.ts'),

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { 
                test: /\.hbs$/, 
                loader: 'handlebars-loader',
                options: {
                    helperDirs: path.resolve(__dirname, 'src', 'helpers-hbs'),
                    partialDirs: [
                        path.resolve(__dirname, 'src', 'views'),
                        path.resolve(__dirname, 'src', 'views', '00-atoms'),
                        path.resolve(__dirname, 'src', 'views', '01-components'),
                    ]
                }
            },
            {
                test: /\.(s?css)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader?sourceMap',
                    'resolve-url-loader?sourceMap',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [ require('tailwindcss'), require('autoprefixer')() ]
                        }
                    },
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.(jpe?g|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    },
                    'image-webpack-loader?bypassOnDebug'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'views', 'layout.hbs'),
            filename: 'index.html',
            favicon: path.join(__dirname, 'src', 'images', 'favicon.png'),
            templateParameters: {
                titleApp: 'TypeScript - Hello World'
            }
        }),
        new Dotenv()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3001,
        open: true,
        publicPath: '/',
        historyApiFallback: true
    }
}
