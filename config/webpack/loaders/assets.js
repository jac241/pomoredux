const { env, publicPath } = require('../configuration.js')

module.exports = {
  test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2|mp3|ogg)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      publicPath,
      name: env.NODE_ENV === 'production' ? '[name]-[hash].[ext]' : '[name].[ext]'
    }
  }]
}
