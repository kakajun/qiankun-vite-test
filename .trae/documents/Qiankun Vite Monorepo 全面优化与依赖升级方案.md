## 目标
- 系统性优化工程（工作区与多子应用的一致性、开发体验、规范化）。
- 全仓库依赖升级至最新稳定版本，避免不兼容升级导致的破坏性变更。
- 在不影响现有功能的前提下，完善可验证与回滚策略。

## 现状与问题概览
- Monorepo：已使用 pnpm workspace 与 Lerna（`lerna.json:2` 指定 `pnpm`），但根脚本仍以 `npm` + `npm-run-all` 串联，易造成包管理器混用（`package.json:9-20`）。
- 主应用（Vite + Vue3）：依赖已较新；但 ESLint 配置混用旧扩展（`packages/main/.eslintrc.js:6-16` 含已弃用的 `prettier/vue`），与 Vue3 推荐规则不一致。
- 子应用（Vue2 CLI4：`packages/vue`、Vue2 CLI4：`packages/vue2-main`、Vue3 CLI5：`packages/vue3`、Vue3 Vite：`packages/vue3Vite`）：
  - Vue2 依赖偏旧（如 `element-ui` 可提升到 2.15.14）。
  - Sass 生态在 Vue2 CLI4 下需维持 `sass-loader@10.x`（Webpack4）兼容；不可盲升至 13.x（Webpack5）。
  - 路由与打包 UMD 输出已按 qiankun 规范，整体正确（如 `packages/vue3/vue.config.js:39-45`、`packages/vue/vue.config.js:57-63`）。
- 资源代理与基座集成：主应用 Vite 代理仅配置了示例路径（`packages/main/vite.config.js:21-41`），可抽象为可维护的 env 驱动。
- 根 ESLint 版本与规则偏旧（`eslint@6.8`、`@vue/cli-plugin-eslint@4.5`），与各子应用不一致，建议统一到最新，并消除多头配置。
- Makefile 存在历史脚本占位（`Makefile:8-33`），与现状不匹配，可清理或同步更新。

## 升级策略
- 包管理器统一：在 workspace 维度统一使用 `pnpm`，根脚本改为 `pnpm -r` 并按 filter 启动各应用；移除 `npm-run-all` 与 `cd` 串联方式。
- 依赖升级（按应用分组）：
  - 根（workspace 工程层）
    - 升级 `eslint` 至 9.x（Flat Config），统一 `eslint-plugin-vue` 9.x 与 `prettier` 3.x；根配置改为 Flat Config，子包统一沿用或覆盖。
    - 若不引入 Flat Config，可至少将旧 `@vue/prettier`、`prettier/vue` 等弃用扩展移除，切换至 `plugin:vue/vue3-recommended` 与 `prettier` 基本集成。
  - `packages/main`（Vite + Vue3）
    - 维持 `vite@^6`、`@vitejs/plugin-vue@^5`、`vue@3.5.x`、`pinia@3.x`、`vue-router@4.5.x`、`qiankun@2.10.x`。
    - 规范 ESLint：改为 Vue3 推荐规则；去除废弃的 `prettier/vue` 等扩展；仅保留必要插件（import/promise/standard 可评估是否保留）。
  - `packages/vue3Vite`（Vite + Vue3 子应用）
    - `vite@^6` 与 `@vitejs/plugin-vue@^5` 均为最新；`vite-plugin-qiankun@1.0.15` 当前已是 npm 最新（参考 npm），可保留。
    - 补充生产 `base`（env 驱动），与 README 的 Nginx 代理范式一致，避免打包后资产路径错误。
  - `packages/vue3`（Vue3 CLI5 子应用）
    - 保持 `@vue/cli-service@^5`、`vue@3.5.x`、`vue-router@4.5.x`、`@vue/compiler-sfc@3.5.x` 最新；less/loader 保持当前稳定版本。
  - `packages/vue`（Vue2 CLI4 子应用）
    - 升级 `element-ui` 至 `2.15.14`（最新稳定）。
    - 保持 `@vue/cli-service@4.5.19` 与 `sass-loader@10.x`（Webpack4 兼容），`sass` 可维持 `1.32.x` 或小幅提至与 loader 兼容的最高 patch。
    - `vue@2.7.16` 与 `vue-template-compiler@2.7.16` 保持严格匹配。
  - `packages/vue2-main`（Vue2 CLI4 子应用）
    - 升级 `vue@2.7.16` 与 `vue-template-compiler@2.7.16` 对齐；
    - 升级 `@vue/cli-service` 至 `4.5.19`；
    - `element-ui` 升级至 `2.15.14`；`core-js` 升级至 `3.38+`（依 Babel preset 自动注入）。
- 版本边界与兼容性：
  - Vue2 应用不跨到 Webpack5；维持 CLI4 + Webpack4 生态，避免 `sass-loader` 大版本不兼容。
  - Vue3 CLI5 与 Vite6 保持各自最新，无交叉依赖。
  - qiankun 主/子应用 API 不变；Vite 子应用继续通过 `vite-plugin-qiankun` helper 导出生命周期（`packages/vue3Vite/src/main.js:52-77`）。

## 工程优化
- 根脚本重构
  - `dev`/`start`：使用 `pnpm -r --parallel --filter "packages/main" --filter "packages/vue" ... run start` 启动所有子应用，避免 `cd`。
  - `build`：`pnpm -r run build` 并按需 filter 控制打包范围；后续脚本（bundle.sh）若存在，可迁移为 Node 脚本或移除。
- 统一 Lint/Format
  - 在根采用 ESLint Flat Config 与 Prettier 统一；子包尽量复用根配置，仅在框架差异处做最小覆盖。
  - 清理历史规则与弃用扩展（如 `prettier/vue`），主应用改为 `plugin:vue/vue3-recommended`。
- Vite 配置
  - 主应用与 Vite 子应用增加基于 `process.env.NODE_ENV` 的 `base`（仅生产），与 README 的 Nginx 代理约定统一，减少资源 404（`packages/vue3Vite/vite.config.js` 增加 `base` 与 env 驱动）。
  - 将代理配置抽象为 env 变量，统一代理清单与注释，减少魔法常量（`packages/main/vite.config.js:21-41`）。
- 路由生命周期
  - 保持主应用 `start()` 时机可延后到首个需要挂载的路由，降低初始开销（现有注释已提示，`packages/main/src/main.js:44-45`）。
- 文档与脚本
  - 更新 README 的安装与启动指令为 `pnpm i` 与 `pnpm start`；Makefile 同步或删除不适用目标。

## 变更定位（示例关键改动点）
- 根脚本：`package.json:9-20` 改为基于 `pnpm -r` 的并行启动/构建。
- 主应用 ESLint：`packages/main/.eslintrc.js:6-16` 移除弃用扩展，切换至 Vue3 推荐规则，保留必要插件规则（`rules` 部分精简）。
- Vite 子应用生产 `base`：`packages/vue3Vite/vite.config.js:11-31` 中加入 `isProduction` 判断与 `base`。
- Vue2 依赖升级：
  - `packages/vue/package.json` 与 `packages/vue2-main/package.json`：提升 `element-ui`、`vue`/`vue-template-compiler`、`@vue/cli-service`、`core-js`。

## 验证方案
- 安装与编译
  - 根执行 `pnpm i`，再 `pnpm start` 并确认各端口：主应用 `8080`，子应用 `7301`/`7305`/`7316`/`7401`。
  - 访问 `http://localhost:8080/`，逐一进入各子应用路由，验证挂载、卸载与路由切换（含 `history.destroy()` 的场景，`packages/vue3/src/main.js:60-67`、`packages/vue3Vite/src/main.js:69-76`）。
- Lint/Format
  - 根运行 `pnpm -r run lint` 与 `pnpm -r run format` 验证一致性。
- 资源与代理
  - 验证 Vite 代理生效与静态资源加载（`/vue2Asset` 等），生产构建下验证 `base` 与 Nginx 代理配置。

## 回滚与风险控制
- 依赖升级采用最小增量、逐包测试；任何包出现不兼容，锁回上一稳定次版本。
- Vue2 生态严格遵循 Webpack4 兼容包版本矩阵；避免 loader 大版本跨越。
- 变更以单提交、清晰 commit message 分类，便于 git 回滚。

## 执行步骤
1. 统一根脚本到 `pnpm -r` 并移除 `npm-run-all` 混用。
2. 升级根与主应用 ESLint/Prettier，统一规则；精简主应用 ESLint 配置。
3. 升级 Vue2 子应用依赖（element-ui、vue、compiler、cli-service、core-js）。
4. 为 Vite 子应用补充生产 `base` 与 env 驱动；主应用代理抽象到 env。
5. 全仓库安装、启动与端到端验证；如有问题按包回退或微调。

确认后我将按以上步骤分批提交变更并完成验证。