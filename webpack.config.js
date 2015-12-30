var fs = require('fs');
var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var sourceMappingURL = require("source-map-url");

var distDir = path.join(__dirname, 'dist');

var webpackConfig = {

    entry: {
        app: './index.js',
        vendor: Object.keys(pkg.dependencies)
    },

    output: {
        path: distDir,
        filename: 'assets/js/[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
    },

    devtool: 'source-map',

    plugins: [
        new Clean(distDir),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),

        new webpack.NamedModulesPlugin(),

        new webpack.optimize.DedupePlugin(),

        new HtmlWebpackPlugin({
            inject: true,
            excludeChunks: ['manifest'],
            templateContent: addManifestChunckContentsToIndexTemplate,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};

function addManifestChunckContentsToIndexTemplate(templateParams, compilation, callback) {
    Object.keys(compilation.assets)
        .filter(function (key) {
            return key.indexOf('manifest.') !== -1;
        })
        .forEach(function (manifestAsset) {
            var isManifestSourceMap = manifestAsset.indexOf('.map') !== -1;
            if (!isManifestSourceMap) {
                // manifestSource will include the //# sourceMappingURL line if including sourcemaps so we need to remove
                var manifestSource = compilation.assets[manifestAsset].source();
                templateParams.htmlWebpackPlugin.options.webpackManifest = sourceMappingURL.removeFrom(manifestSource);
            }

            delete compilation.assets[manifestAsset];
        });

    fs.readFile('./index.html', 'utf8', callback);
};

module.exports = webpackConfig;