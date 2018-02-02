# 云总机

``` bash
 npm install            # 安装依赖
 npm run dev            # 开启本地服务器
```

## 项目结构

``` bash
├── / build
├── / config
├── / src
│   ├── / assets          # 资源
│   ├── / components      # 组件
│   │   ├── / authenticate  # 认证页面相关组件
│   │   └── / common        # 公共组件
│   ├── / routers         # 路由
│   │   └── index.js
│   ├── / store           # 状态管理文件
│   │   ├── / modules       # 状态模块
│   │   └── index.js
│   ├── / styles          # 样式文件
│   │   └── /core          # 样式文件
│   │       ├── mixin.scss    # 混合
│   │       ├── reset.scss    # 重置
│   │       ├── theme.scss    # 主题配置
│   │       └── vars.scss     # 公共变量
│   ├── / utils           # 公共方法
│   │   ├── / api.js        # 接口封装
│   │   ├── / request.js    # 请求方法封装
│   │   └── / rules.js      # 校验规则
│   ├── / views           # 页面
│   ├── App.vue           # 入口组件
│   └── main.js           # 入口js文件
├── / static              # 静态资源
├── .babelrc              # babel 配置
├── .editorconfig         # 代码书写规范
├── .eslintignore         # 配置 eslint 忽略规则
├── .eslintrc.js          # 配置 eslint 检测规则
├── .postcssrc.js         # 自动补全浏览器前缀配置
├── index.html
├── package.json
└── README.md
```