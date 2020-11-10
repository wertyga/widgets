const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { widgetsEntries } = require('./helpers');
const GenerateHashEnv = require('./generateENVs');

const browserConfig = {
  entry: {
    ...widgetsEntries,
    render: path.join(__dirname, '../widgets/render.js'),
    test: path.join(__dirname, '../TEST/clientTest.js'),
  },

  output: {
    path: path.join(process.cwd(), 'public'),
    publicPath:  '',
    filename: ({ chunk: { name } }) => {
      if (name === 'test') return '../TEST/test_compiled.js';
      return '[hash]_[name].js';
    },
  },

  mode: process.env.NODE_ENV || 'development',
  watch: process.env.NODE_ENV === 'development',

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        include: path.resolve(process.cwd(), 'widgets/styles.css'),
        options: {
          importLoaders: 1,
          modules: {
            compileType: 'module'
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
        exclude: path.resolve(process.cwd(), 'widgets/styles.css'),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: 'babel-loader'
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: (getPath) => {
        const filepathHash = getPath('css/[hash].css');
        const filepathName = getPath('css/[name].css');
        const clearName = (filepathName.match(/^css\/(\w*)_\w/) || ['', ''])[1];

        return filepathHash.replace('.css', `_${clearName}.css`);
      },
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      "PropTypes": "prop-types"
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(process.cwd(), 'static'), to: path.join(process.cwd(), 'public/static') },
        {
          from: path.join(process.cwd(), 'widgets/styles.css'),
          to: path.join(process.cwd(), 'public/css/common.css'),
        },
      ],
    }),
    new GenerateHashEnv(),
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const serverConfig = {
  entry: {
    server: path.join(__dirname, 'server/index.js'),
  },

  output: {
    path: path.join(__dirname, 'public'),
    publicPath:  '/',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      },
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
      "PropTypes": "prop-types"
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = [browserConfig];
