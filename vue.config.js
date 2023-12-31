const { defineConfig } = require('@vue/cli-service')
const dependencies = require('./package.json').dependencies
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin

const { MFLiveReloadPlugin } = require('@module-federation/fmr')
const publicPath = process.env.VUE_APP_DOMAIN
const prefixEnvironment = process.env.VUE_APP_ENVIROMENT == 'production' ? '' : 'almost-'
const { proyect_name, proyect_port } = require('./config')

const plugins = [
  new ModuleFederationPlugin({
    name: proyect_name,
    filename: 'remoteEntry.js',
    remotes: {
      app_alegra_commons: `app_alegra_commons@https://${prefixEnvironment}alegra-commons.alegra.com/remoteEntry.js?v=[('0' + (new Date().getMonth()+1)).slice(-2)+('0'+new Date().getDate()).slice(-2)+new Date().getHours()]`,
    },
    exposes: {
      './microfront': './src/micro/mount',
    },
    shared: {
      'core-js': { singleton: true, requiredVersion: '3.8.3' },
      'lodash-es': { singleton: true, requiredVersion: '4.17.21' },
      pinia: { singleton: true, requiredVersion: '2.0.14' },
      vue: { singleton: true, requiredVersion: '3.2.19' },
      'vue-router': { singleton: true, requiredVersion: '4.0.16' },
      '@alegradev/smile-ui-next': dependencies['@alegradev/smile-ui-next'],
    },
  }),
  new ExternalTemplateRemotesPlugin(),
]

if (process.env.VUE_APP_ENVIROMENT == 'local') {
  plugins.push(
    new MFLiveReloadPlugin({
      port: proyect_port, // the port your app runs on
      container: proyect_name, // the name of your app, must be unique
      standalone: false,
    })
  )
}

module.exports = defineConfig({
  assetsDir: 'template-assets',
  publicPath: publicPath ? publicPath : 'auto',
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: proyect_port,
      host: 'dev.alegra.com',
      historyApiFallback: true,
      liveReload: true,
    },
    optimization: {
      splitChunks: false,
    },
    plugins,
  },
})
