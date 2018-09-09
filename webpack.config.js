const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');

let config = {
    mode: '',
    entry: path.join(__dirname, 'src', 'entry'),
    output: {
        filename: 'authorize-sdk.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_components')
            ],
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devtool: 'source-map',
    devServer: {
        publicPath: path.join('/dist/'),
        port: 8080,
        host: 'localhost'
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.watch = true;
    }
    if (argv.mode === 'production') {
        config.plugins = [
            new uglify()
        ];
    }
    return config;
};