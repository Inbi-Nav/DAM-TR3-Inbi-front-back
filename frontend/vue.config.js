module.exports = {
  lintOnSave: false, 
  transpileDependencies: [],
  devServer: {
    host: '0.0.0.0',
    port: 27776,
    allowedHosts: 'all',
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: true
      }
    }
  }
}
