# qiankun-example

qiankun 练习 demo，父应用 vue3(vite)，子应用用 vue(webpack) 和 vue3(webpack)和vue3(vite)

## 一、项目特色
### 1. 开发环境，秒级更新，vite加入子应用需使用vite-plugin-qiankun, 注意父级应用不用加,为什么不加?
因为官方qiankun没有兼容vite做为子应用,或许后面vite官方兼容了vite做为其子应用后就可以去掉该插件了；
### 2. 使用postcss-px-to-viewport 插件，实现响应式布局（任意屏幕适配）；
### 3. 根据vant2 自定义主题颜色；
### 4. 加入eslint、stylelint、prettier等插件，制定代码统一规范。

[微前端qiankun从搭建到部署的实践](https://juejin.im/post/6875462470593904653)

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

## 三、目前的开发任务

1. 主系统篇
- [-] 整体架构
- [✔] 主页面整体交互
- [ ] 全局数据流共享
