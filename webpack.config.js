const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: "./src/js/main.ts",

    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: "ts-loader"
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