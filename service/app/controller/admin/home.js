const Controller = require('egg').Controller

class HomeController extends Controller {
    //登录
    async login() {
        let {userName,password} = this.ctx.request.body
        const USER_TABLE = 'user'
        let sql = `select ${USER_TABLE}.userName
        from ${USER_TABLE} 
        where ${USER_TABLE}.userName = '${userName}'
        and ${USER_TABLE}.password = '${password}'`

        const results = await this.app.mysql.query(sql)
        if (results.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId } //存储到session中,下次登录不用再查询数据库
            this.ctx.body = {
                code:'200',
                data: '登录成功',
                openId:openId,
                msg:'success'
            }
        } else {
            this.ctx.body = {
                code:'500',
                data: '登录失败',
                msg:'error'
            }
        }
    }
    //获取文章类别
    async getTypeInfo() {
        const resType = await this.app.mysql.select('blog_type')
        this.ctx.body = {data: resType}
    }
}

module.exports = HomeController