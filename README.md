# Vue 3 + Typescript + Vite + Antd


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

# 分层架构

![](http://processon.com/chart_image/618ccd73079129330ad20365.png)
# 代码结构说明

```
├── assets              (静态资源)
├── component           (组件)
│   ├── base                (基础组件)
│   └── common              (通用组件)
├── domain              (领域模型)
│   └── base                (基础模块)
├── infrastructure      (基础设施)
│   ├── axios               (网络请求)
│   ├── indexdb             (indexDB)
│   ├── router              (路由)
│   └── store               (状态)
├── services            (服务)
├── types               (类型定义)
│   └── base                (基础类型定义)
└── views               (页面视图)

```