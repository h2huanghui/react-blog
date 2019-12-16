module.exports = app => {
    const { router, controller } = app
    var adminauth = app.middleware.adminauth()
    router.post('/admin/login',controller.admin.home.login)
}