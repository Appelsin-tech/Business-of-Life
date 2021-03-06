const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProd = () => process.env.NODE_ENV === 'production'
const splitChunks = {
  chunks: 'all'
}
module.exports = {
  devServer: {
    disableHostCheck: true
  },
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'disabled'
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@admin', path.resolve(__dirname, 'src/components/admin'))
      .set('icons', path.resolve(__dirname, 'node_modules/vue-material-design-icons'))

    config.optimization
      .splitChunks(splitChunks)

    config.plugins.delete('prefetch')

    config.module.rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')

    config
      .plugin('copy')
      .tap(args => {
        return [[
          {
            from: './src/assets/.htaccess',
            to: '[name].[ext]'
          },
          {
            from: 'favicon.png',
            to: '[name].[ext]'
          },
          {
            from: 'logo.jpg',
            to: '[name].[ext]'
          },
          {
            from: './src/assets/css/print.css',
            to: 'css/[name].[ext]'
          }
        ]]
      })
  }
}
var smartgrid = require('smart-grid')

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'less', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '20px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1380px', /* max-width оn very large screen */
    fields: '20px' /* side fields */
  },
  breakPoints: {
    xxl: {
      width: '1430px'
    },
    xl: {
      width: '1300px'
    },
    lg: {
      width: '1170px'
    },
    md: {
      width: '990px'
    },
    sm: {
      width: '750px'
    },
    ss: {
      width: '540px'
    },
    xs: {
      width: '425px',
      fields: '10px',
      offset: '10px'
    }
    /*
    We can create any quantity of break points.

    some_name: {
        width: 'Npx',
        fields: 'N(px|%|rem)',
        offset: 'N(px|%|rem)'
    }
    */
  }
}

smartgrid('./src/assets/less', settings)
