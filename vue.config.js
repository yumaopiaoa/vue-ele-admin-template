module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    port: 9898,
    proxy: {
      "/api": {
        // target: "http://lottemp.houkeyun.com/", //代理的目标地址
        target: "http://10.10.10.49", //代理的目标地址
        changeOrigin: true,
        pathRewrite: {
          //路径重写
          "^/api": "",
        },
      },
      "/mp": {
        target: "https://api.weixin.qq.com/cgi-bin", //代理的目标地址
        changeOrigin: true,
        pathRewrite: {
          //路径重写
          "^/mp": "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
};
