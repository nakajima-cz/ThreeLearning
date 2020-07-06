const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        "css3d": './src/js/modules/css3d.ts',
        "index": './src/js/modules/index.ts',
        "world": './src/js/modules/world.ts',
        "logo": './src/js/modules/logo.ts',
        "basic": './src/js/modules/basic.ts',
    },
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        // 出力ファイル名
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: "ts-loader"
            },
            {   // 画像もバンドルする 対象となるファイルの拡張子
                test: /\.(gif|png|jpg)$/,
                // 画像をBase64として取り込む
                loader: 'url-loader'
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
    ]
};