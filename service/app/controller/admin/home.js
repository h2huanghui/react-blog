const Controller = require('egg').Controller

class HomeController extends Controller {
    //登录
    async login() {
        let {userName,password} = this.ctx.request.body
        const USER_TABLE = 'user'
        let sql = `select ${USER_TABLE}.id
        from ${USER_TABLE} 
        where ${USER_TABLE}.userName = '${userName}'
        and ${USER_TABLE}.password = ${password}`

        const results = await this.app.mysql.query(sql)
        this.ctx.body = {
            code:200,
            data: results,
            msg:'success'
        }
    }
}

module.exports = HomeController