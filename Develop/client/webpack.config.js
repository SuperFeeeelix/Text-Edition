const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'],
      }),
      // Generate manifest file for PWA
      new WebpackPwaManifest({
        name: 'My PWA',
        short_name: 'PWA',
        description: 'My Progressive Web App',
        background_color: '#ffffff',
        theme_color: '#000000',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('src/images/icon.png'), 
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // Inject the service worker into HTML
      new InjectManifest({
        swSrc: './src/src-sw.js',
        exclude: [/\.map$/, /manifest$/, /service-worker\.js$/],
      }),
    ],

    module: {
      rules: [
        // Configure CSS loaders and Babel rules as needed
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
