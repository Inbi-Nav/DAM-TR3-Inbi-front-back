module.exports = {
  lintOnSave: false, // 👈 esto desactiva ESLint
  transpileDependencies: [],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: 'all',
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: true
      }
    }
  }
}
