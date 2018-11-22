module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].hash = true
      return args
    })
  },
  pwa: {
    name: 'Face Value',
    themeColor: '#F47D4A'
  }
}
