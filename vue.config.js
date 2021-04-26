module.exports = {
    publicPath: "/",//配置根目录
    outputDir: "dist",//构建输出目录
    assetsDir: "assets",//静态资源目录(js,css,image)
    lintOnSave: false,//是否开启eslint检测 false不开启,有效值:true||false
    productionSourceMap: true,//生产环境下开启sourceMap支持断点调试
    devServer: {
        open: true,//是否啟動打開瀏覽器
        host: "0.0.0.0",//主機,0.0.0.0支持局域网地址,可以用真机测试
        port: 8080,//端口
        https: false,//是否启动https
        //配置跨域代理
        proxy: {
            "/api": {
                target: "http://vueshop.glbuys.com/api",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    configureWebpack: {
        devtool: "source-map"//配置开发者环境的sourceMap支持断点调试
    }
};
