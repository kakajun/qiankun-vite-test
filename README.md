# qiankun-example

qiankun 练习 demo，父应用 vue3(vite)，子应用用 vue(webpack) 和 vue3(webpack)和vue3(vite)

## 一、项目特色
### 1. 开发环境，父级用vite秒级更新，
### 2. 子应用也有为vite的vite加入子应用需使用vite-plugin-qiankun, 注意父级应用不用加
为什么不加?
因为官方qiankun没有兼容vite做为子应用,vite启动方式为module, 而其他的启动为script, 或许后面vite官方兼容了vite做为其子应用后就可以去掉该插件了；

## 二、开始
一键安装所有主子应用的依赖
```
npm i
```

一键启动所有所有应用
```
npm start
```
通过 [http://localhost:8080/](http://localhost:8080/) 访问主应用。

## 三、需要注意的坑
我是被这些坑折磨够呛, 这里记录一下,
1.  父应用常规配置vite和乾坤没啥讲的
2. 子应用配vite-plugin-qiankun, main里面也要使用
3. 图片加载失败?? 因为vite的代码没有经过打包,所以不会自动加上域名,在父应用就看到图片挂了!!!百度也查不出个123, 甚至想用axios请求图片吧,看又不是常规vue写法了,不至于吧!!最后仔细又看了一遍配置文档,发现可以配置config.base,指定vite服务域名, 当基座打开浏览时,依然挂的是子应用域名
4. 路由跳转出错? 这个也是我粗心,复制别人的 window.__POWERED_BY_QIANKUN__ 然后路由死活不行, 最后看文档要写成qiankunWindow.__POWERED_BY_QIANKUN__
5. 子应用跳转vue3Vite/vue ,什么鬼?路由叠加? 抓狂,原来是unmount里面漏写了history.destroy()

至此改造算是完成了qiankun+vite的基础配置
