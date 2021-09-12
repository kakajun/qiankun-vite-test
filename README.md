# qiankun-example

qiankun 实战 demo，父应用 vue(vite)，子应用用 react(webpack) 和 vue(webpack)

## 一、项目特色
### 1. 开发环境，秒级更新，vite2成功构建vue2；
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
