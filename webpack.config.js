const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'prop-types': 'prop-types',
        'str-case-converter': 'str-case-converter',
    },
};
