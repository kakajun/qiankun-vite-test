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

## 三、对于乾坤的一些思考
 1. 乾坤适合新老项目工程搭配,老工程是老技术实现的, 升级有难度或没必要, 那么这时可以新模块用新技术实现,老工程稍微用乾坤改改
 2. 两个工程技术一样, 但两个工程完全没有什么重合的场景, 但有时需要结合使用,就像我目前这个工程, 两个工程业务场景压根不是你包含我或我包含你的关系, 但又需要同时在一个工程中使用, 整合肯定没必要, 采用乾坤,  分开部署, 分开升级是个不错的选择.
 3. 完全新开工程, 不要试图采用乾坤进行微服务架构, 没有必要, 现在前端工程可以用更先进的monorepo分包模式架构, 分包还可以进行版本升级,打成插件的模式, 进行版本管理, 即使后期应用到不同项目也方便对不同插件进行升级, 整成微服务后, 每个服务都要去维护, 那么维护成本也会很大

## 四、需要注意的坑
我是被这些坑折磨够呛, 这里记录一下,
1.  父应用常规配置vite和乾坤没啥讲的

2. 子应用配vite-plugin-qiankun, main里面也要使用

3. 图片加载失败??

   第一种方法: 图片放publlic里面, 装一个特殊命名的文件夹里面, 独立工程里面正常引用, 如果集成到qiankun里面, 需要在主工程里面加上路径代理,如demo, 这样子子工程里面不需要进行特殊处理, 像threejs 中引用模型, 材质, 等文件, 也可以使用这个方法
   ```js
   '/vue2Asset': {
    target: 'http://localhost:7301',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/vue2Asset/, '/vue2Asset')
   }
   ```

    第二种方法: 这里采用的是图片资源直接放到public里面, 引用图片时加个window.ORIGIN, 这个值是mian里面初始化过的,所有前缀都加上,这样子基座里面请求的图片是子应用带上的, 这种方法需要改造原工程, 不推荐

4. 路由跳转出错? 这个也是我粗心,复制别人的 window.__POWERED_BY_QIANKUN__ 然后路由死活不行, 最后看文档要写成qiankunWindow.__POWERED_BY_QIANKUN__

5. 子应用跳转vue3Vite/vue ,什么鬼?路由叠加? 抓狂,原来是unmount里面漏写了history.destroy()

6. axios请求时, 需要主工程也配置相应代理, 否则请求会出现404, 因为开发环境下是主工程做的代理替换

7. 加载子应用的某一个路由? 怎么设定? 在测试过程中, 好几个小时的尝试都是在registerMicroApps 时, 如果name 和activeRule 不匹配时, 就不能进行模板替换,
- name（子应用的名称） 这个好理解, 比如我的子应用叫dash(随意), 后面dash里面的其他路由都会挂在这个后面

- activeRule（子应用的激活规则） /dash/index, 路由命中后,跳转/dash/index路由, 想法很不错, 但是事与愿违, 不出意外跳进去没有问题, 但是当点击该子应用其他按钮跳转路由时就有问题了,跳完页面就被卸载了......为什么会这样子呢? 因为路由匹配机制, /dash/index  和 /dash/view 它会认为不匹配, 直接就卸载了微应用, 但如果我就命名为 /dash   那么/dash/index和/dash/view 它会认为是同一个微应用
- props（主应用需要传递给子应用的数据）

8. 加载子应用失败? 是的, 怎么都不加载.....页面空白, 没有dom:

- 只能一一检查配置, 但确实没有配错
- 其他路由有影响? 干掉所有路由, 加载一个测试的页面..没用
最后检查到public的cdn引用加载响应qiankun的替换, 具体原因没查, 就是下面几个影响, 注释掉之后马上就加载了服务, 高德地图影响qiankun?......
```js
    <script type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=72601eb4f91ef7b47a9b31163e10e37f"></script>
    <script src="https://webapi.amap.com/loca?key=72601eb4f91ef7b47a9b31163e10e37f&v=1.3.2">
    </script>
    <script src="//webapi.amap.com/ui/1.1/main.js?v=1.1.1"></script>
```
9. 我只是加载一个子应用,而且首屏就要加载, 这时候刷新页面存在乾坤找不到dom元素? 因为刷新页面后存在可能路由页面还没加载然后就注册了qiankun子应用,导致找不到替换的id页面,后面查原因是子程序出错了, token过期...之前是写死在里面的这下又要解决单点登陆问题了
还有其他问题, 就如例子中,我把`<div id="cnbi-viewport"></div>`写在about页面, 他属于路由的子页面,并不在App页面中,切换路由后依然报找不到`cnbi-viewport` 这个div,  我又看了下qiankun说明, 可以手动加载`loadMicroApp`, 也出错... 看来只能在 <router-view></router-view> 上面直接用`<div id="cnbi-viewport"></div>`了


10. 单点登陆: 这个可大可小, 大的集团公司, 一般会有一个认证中心, 认证中心会有应用注册--注册完了有个id----授权---路由重定向,等过程. 咱没有认证中心, 那就简单调接口实现?
- A应用登陆后,控制B应用路由页面是否显示, 这算是一道权限控制, 路由页面有了后, 内部调用B应用的登陆(前提两应用用户认证的是一样的)
- token都由A应用传到B应用, 简单暴力, 如果需要运维单独登陆到B系统,那么B应用搞个自己的认证体系,登陆(我采用第二种)

至此改造算是完成了qiankun+vite的基础配置

11. 打包到服务器, 发现来回切换子应用, 发现 instance.unmount() 会报错, 后面查找问题是一个组件的问题, 把它注释掉, 那么子应用卸载就正常了, 如果大家遇到卸载子应用报错的问题, 也可以尝试一下, 屏蔽相关组件, 一个个试


## 五、父子组件传值
之前demo的传值,是主工程下发到main里面的, 压根不能在vue组件里面使用, 我也看了别人一些写法, 大多是有在子工程里面, 又建一个方法, 这样子其实是冗余的

 主子工程的通信格式肯定是要一致的, 否则就是鸡同鸭讲话, 既然一样那么方法直接定义到主工程里面, 格式也由主工程定义就好了, 派发给子工程用

  子工程在main里面接收, 然后作为方法,直接挂在到全局,`Vue.prototype.$qiankun=props`,  子应用的vue页面通过` this.$qiankun`可以获得所有方法, 然后进行操作, 具体看vue子应用的App页面

vue3 的父子应用通信:
1. 子应用通过props接收主应用的方法, 然后进行操作
2. 在main.js 中挂载全局方法, 在 `HelloWorld`中使用方法,具体看demo
```js
  instance.config.globalProperties.$getGlobalState = props.getGlobalState
  instance.config.globalProperties.$onGlobalStateChange =props.onGlobalStateChange
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
```

## 六、部署

1. 配置nginx的代理放到主工程里面, 子工程也要相应配置, 这样方便单独打开子应用(假如不需要依赖主工程)
2. 要改子应用的打包, 因为主工程加载子应用时,用的是主工程的域名, 加载子应用会404, 所以这么配置后, 主工程要把`3dmodels` 这个前缀ngnix 代理到子应用
```js
// 判断是否是生产构建
const isProduction = process.env.NODE_ENV === 'production'
export default defineConfig({
  base: isProduction ? '/3dmodels/' : '/', // 生产带前缀，开发相对路径
})
```

```js
   location /3dmodels/ {
        proxy_pass http://localhost:8123/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_ssl_verify off;
        }
```
