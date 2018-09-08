const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: {
        'mall': './src/main/mall.js',
        'mcms':'./src/main/mcms.js',
        'people':'./src/main/people.js',
        'mstore':'./src/main/mstore.js',
        'upload':'./src/upload/upload.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js'
    },
    plugins: [
        new cleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            chunks: ['mall','mcms','people'],
            template: './src/index.html',
            filename: 'index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                // 不检查node_modules下的js文件
                exclude: "/node_modules/"
            },
            // {
            //   test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            //   loader: "url-loader?limit=8192"
            // },

            // {
            //   test: /\.png$/,
            //   loader: "file-loader?name=imgs/[name]-[hash].[ext]"
            // }
        ]
    }
}