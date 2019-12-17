'use strict';

module.exports = app => {
    const { router, controller } = app
    var adminauth = app.middleware.adminauth()
    router.post('/admin/login', controller.admin.home.login),
    router.get('/admin/getTypeInfo',adminauth,controller.admin.home.getTypeInfo)
}