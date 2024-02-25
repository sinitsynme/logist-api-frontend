module.exports = {
  devServer: {
    port: 8081
  },
  chainWebpack: (config) => {
    config.module
        .rule("mjs")
        .test(/\.mjs$/)
        .type("javascript/auto")
        .include.add(/node_modules/)
        .end();
  },
}