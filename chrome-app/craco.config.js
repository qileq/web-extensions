const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [paths.appIndexJs],
                    content: ['./src/content_scripts/Popover.tsx'],
                    background: './src/background.ts'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
                devtool: "source-map",
                plugins: [
                    new HtmlWebpackPlugin({
                        template: 'public/index.html'
                    }), 
                    new MiniCssExtractPlugin({filename: 'static/css/[name].css'})
                ],
            }
        },
    }
}