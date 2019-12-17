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

# 功能1：用户名密码验证
### 1. 数据库建表 
表名`user`
字段 主键 `Id` 用户名 `userName`  密码 `password`

### 2. controller代码编写,详见home.js文件
目录结构：service(服务端目录)-->app-->controller-->admin(后端文件夹)-->home.js

### 3. 路由配置

#### 3.1 首先 app-->router目录下，新建admin.js
```
module.exports = app => {
    const { router, controller } = app
    router.post('/admin/login',controller.admin.home.login) //controller.admin.home.login 为对应的文件夹下的文件中的方法
}
```

### 3.2 router.js中按需引入admin.js
```
module.exports = app => {
  require('./router/default')(app)
  require('./router/admin')(app)
};

```
### 4. 新建api.js(主要目的是，方面上线直接修改为线上真实url请求地址)
admin-->src-->config-->api.js

```
let ipUrl = 'http://localhost:7002/admin/' //后台

let servicePath = {
    login: `${ipUrl}login`, //登录
}

export default servicePath
```

### 5. 修改Login.js(post提交)
admin-->src-->Pages-->Login.js

#### 5.1 引入api地址
`import servicePath from '../config/api'`

#### 5.2 首先验证，用户名密码是否为空(如果为空，没必要发请求浪费资源去请求)
```
if (!userName) {
    message.error('用户名不能为空')
    setTimeout(() => {
        setIsLoading(false) //正在加载的样式去除
    })
    return false
} else if (!password) {
    message.error('密码不能为空') 
    setTimeout(() => {
        setIsLoading(false)
    })
    return false
}
```

#### 5.3 用户名密码不为空，请求验证用户名和密码是否正确
代码中有缓存处理
```
axios({
    method: 'post',
    url: servicePath.login,
    data: dataProps,
    withCredentials: true //前端后端公用session,跨域检验cookie
}).then(res => {
    setIsLoading(false)
    if (res.data.code === '200') {
        localStorage.setItem('openId',res.data.openId)
        //路由跳转
        props.history.push('/index')
    } else {
        message.error('用户名密码错误')
    }
})
```

# 功能2: 获取文章类别,并且接口请求前,用中间件来判断用户是否登录

## 1. home.js新建异步方法
```
async getTypeInfo() {
    const resType = await this.app.mysql.select(blog_type)
    this.ctx.body = {data: resType}
}
```

## 2. 配置路由,中间件adminauth作为第二个参数(用于判断get之前，首先进行是否登录判断)
### 2.1 
```
module.exports = app => {
    const { router, controller } = app
    var adminauth = app.middleware.adminauth()
    router.post('/admin/login', controller.admin.home.login),
    router.get('/admin/getTypeInfo',adminauth,controller.admin.home.getTypeInfo)
}
```

### 2.2 中间件代码 adminauth.js
`service-->app-->middleware`

如果有缓存中有openId,则继续路由跳转

如果没有,则返回未登录
```
module.exports = options => {
    return async function adminauth(ctx,next) {
        console.log(ctx.session.openId)
        if (ctx.session.openId) {
            await next() 
        } else {
            ctx.body = {data: '未登录'}
        }
    }
}
```
## 3. 增加config下的api

`admin-->src-->config-->api.js`
```
let ipUrl = 'http://localhost:7002/admin/' //后台

let servicePath = {
    login: `${ipUrl}login`, //登录
    getTypeInfo: `${ipUrl}getTypeInfo` //获取文章类别
}

export default servicePath
```

## 4. 修改AddArticle.js
### 4.1 引入
```
import servicePath from '../config/api'
import axios from 'axios'
```
### 4.2 axios请求

判断相应数据,是否登录

```
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url:servicePath.getTypeInfo,
            withCredentials:true
        }).then(res => {
            if (res.data.data === '未登录') { //中间价返回的值
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data) //react hooks设置值
            }
        })
    }
```

## 4.3 `useEffect`执行方法

`import React, { useState,useEffect } from 'react'`]
```
useEffect(() => {
    getTypeInfo()  //react hooks 两个参数,第一个参数是匿名函数,第二个是一个空数组(代表只执行一次)
},[])
```






