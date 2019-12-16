# 使用技术如下:
React 16,Redux,React Router,React Hooks,Next.js, egg.js 

## 支持Markdown语法
`npm i --save react-markdown`

## 安装egg.js开发环境

### a. 全局安装`egg.js` `npm i egg-init -g` 
### b. 新建`service`文件夹,执行`egg-init --type=simple`

### c. `npm i`

### d. `npm run dev`

## 中台搭建 RESTful(移动端App前后端分离的接口设计)
### a. 直观并且接口有一定的约束性 
get 获取资源 post 新建资源 put 更新资源 delete 删除资源
### 区分管理端和客户端api
admin - 管理端使用的所有API接口
default - 客户端使用的所有API接口
### default ->home.js - 前台首页需要的api接口

### 配置路由(前后端分离)
router->admin.js
router->default.js


## 1. 接口
## 2. 路由
## 2.1 中间件
## 3. 后台配置API (优点：配置统一管理,上线可以直接修改真实接口地址)
## 4. 后台页面



