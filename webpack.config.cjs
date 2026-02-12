/* eslint-disable */
const path = require('path');
const fs = require('fs');
const pug = require('pug');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const posthtml = require('posthtml');
const posthtmlWebp = require('posthtml-webp');
const posthtmlReplace = require('posthtml-replace');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');

// КОНСТАНТЫ
const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

const PAGES_DIR = `${SRC}/pages`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.pug') && !fileName.startsWith('_'));

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// ПЛАГИНЫ
const plugins = [
  // Удаляет старый /dist
  new CleanWebpackPlugin(),

  // Копирование файлов
  new CopyPlugin({
    patterns: [{ from: 'assets/json', to: 'assets/json' }],
  }),

  // Спрайт
  new SpriteLoaderPlugin({
    plainSprite: true,
    spriteAttrs: {
      fill: '',
    },
  }),

  // Обработка css - собирает все в один файл
  new MiniCssExtractPlugin({
    filename: isDev ? './css/[name].css' : './css/[name].[contenthash].css',
    chunkFilename: isDev ? './css/[id].css' : './css/[id].[contenthash].css',
  }),

  // eslint
  new ESLintPlugin({
    extensions: ['js'],
    // fix: true,
  }),
];

if (isDev) plugins.push(new webpack.HotModuleReplacementPlugin());

if (isProd) {
  // ✅ только prod: генерим все html
  plugins.push(
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug$/, '.html')}`,
          chunks: ['index'],
          inject: 'body',
          minify: {
            collapseWhitespace: false,
            keepClosingSlash: true,
            removeComments: true,
          },
        })
    )
  );
}

// КОНФИГ ОПТИМИЗАЦИИ
const optimization = () => {
  const config = {
    splitChunks: { chunks: 'all' },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),

      new TerserPlugin(),

      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['mozjpeg', { progressive: true }],
      //         ['optipng', { optimizationLevel: 5 }],
      //       ],
      //     },
      //   },
      //   generator: [
      //     {
      //       preset: 'webp',
      //       implementation: ImageMinimizerPlugin.imageminGenerate,
      //       options: {
      //         plugins: ['imagemin-webp'],
      //       },
      //     },
      //   ],
      // }),
    ];
  }

  return config;
};

module.exports = {
  context: SRC,
  target: isDev ? 'web' : 'browserslist',
  mode: process.env.NODE_ENV,
  entry: {
    index: ['@babel/polyfill', './index.ts'],
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: DIST,
    publicPath: '/', // ✅ важно для devServer
    assetModuleFilename: '[path][name][ext]',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  optimization: isDev
    ? {
      splitChunks: false,
      runtimeChunk: false,
    }
    : optimization(),

  devServer: {
    port: 1666,
    hot: true,
    historyApiFallback: false,
    watchFiles: [`${SRC}/**/*.{pug,ts,tsx,js,scss,css}`],
    open: true,

    static: [
      {
        directory: path.join(SRC, 'assets'),
        publicPath: '/assets',
        watch: true,
      },
    ],

    // ✅ главное: динамический рендер PUG по URL
    setupMiddlewares: (middlewares, devServer) => {
      const app = devServer.app;

      app.get('/:page.html', (req, res, next) => {
        const page = req.params.page;
        const pugPath = path.join(PAGES_DIR, `${page}.pug`);

        if (!fs.existsSync(pugPath)) return next();

        try {
          // рендерим только нужный pug
          const htmlFromPug = pug.renderFile(pugPath, {
            pretty: true,
            // если нужны locals — добавляй сюда
          });

          const cssTag = `<link rel="stylesheet" href="/css/index.css">`;

          const jsTag = '<script src="/index.js"></script>';

          let out = htmlFromPug;

          // CSS -> head
          if (/<\/head>/i.test(out)) out = out.replace(/<\/head>/i, `${cssTag}\n</head>`);
          else out = `${cssTag}\n${out}`;

          // JS -> body
          if (/<\/body>/i.test(out)) out = out.replace(/<\/body>/i, `${jsTag}\n</body>`);
          else out = `${out}\n${jsTag}\n`;


          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.send(out);
        } catch (e) {
          next(e);
        }
      });

      // опционально: корень / -> на какую-то страницу
      app.get('/', (req, res) => res.redirect('/index.html'));

      return middlewares;
    },
  },
  devtool: isDev ? 'source-map' : false,
  plugins,
  module: {
    rules: [
      {
        test: /icons.*\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: './assets/img/icons/sprite.svg',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: '(fill|stroke)',
                  },
                },
              ],
            },
          },
        ],
      },

      {
        test: /svg.*\.svg$/,
        type: 'asset/resource',
      },

      {
        test: /\.(png|jpe?g|gif|webp|ico)$/,
        type: 'asset/resource',
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      // TypeScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // plugins: [], // Плагины для babel сюда
          },
        },
      },

      ...(isProd
        ?
        [
          {
            test: /\.pug/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: false,
                  sources: {
                    // Фильтруем загрузку ресуров
                    // Пропускаем где в пути есть sprite.svg - т.к. он появляется только в dist
                    urlFilter: (attr, val) => {
                      if (/sprite\.svg/.test(val)) return false;
                      return true;
                    },
                  },
                  preprocessor: (content, loaderContext) => {
                    let result;

                    try {
                      result = posthtml([
                        // Делаем из img -> picture
                        // img(src=*.jpg) -> picture [ source(srcset=*.jpg.webp) img(src=*.jpg) ]
                        posthtmlWebp(),
                        // Чтоб правильно конвертировались картинки в webp нужно передать ?as=webp
                        posthtmlReplace([
                          {
                            match: { tag: 'source' },
                            attrs: {
                              srcset: (attr, node) => {
                                if (attr) {
                                  return node.attrs.srcset.replace(
                                    '.webp',
                                    '?as=webp'
                                  );
                                }
                                return null;
                              },
                            },
                          },
                        ]),
                      ]).process(content, { sync: true });
                    } catch (error) {
                      loaderContext.emitError(error);
                      return content;
                    }

                    return result.html;
                  },
                },
              },
              { loader: 'pug-html-loader', options: { pretty: true } },
            ],
          },
        ]
          :
        []
      )
    ],
  },
};
