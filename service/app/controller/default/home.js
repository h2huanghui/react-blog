'use strict';

const Controller = require('egg').Controller;
const TABLE_NAME1 = 'article'
const TABLE_NAME2 = 'blog_type'


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    //读取表
    let result = await this.app.mysql.get('blog_content', {})
    console.log(result)
    ctx.body = result
  }

  //查询|query
  async getArticleList() {
    const QUERY_STR = `${TABLE_NAME1}.id,title,introduce,addTime,view_count,typeName`

    let sql = `select ${QUERY_STR} from ${TABLE_NAME1},${TABLE_NAME2}
    where ${TABLE_NAME1}.blog_type_id  = ${TABLE_NAME2}.id`

    const results = await this.app.mysql.query(sql)

    this.ctx.body = {
      data: results
    }
  }

  async getArticleById() {
    //先配置路由的动态传值,然后再接收值
    let id = this.ctx.params.id

    const QUERY_STR = `${TABLE_NAME1}.id,title,introduce,article_content,addTime,view_count,typeName,${TABLE_NAME2}.id`

    let sql = `select ${QUERY_STR} from ${TABLE_NAME1},${TABLE_NAME2}
    where ${TABLE_NAME1}.blog_type_id  = ${TABLE_NAME2}.id and ${TABLE_NAME1}.id=${id}`

    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results
    }
  }
}

module.exports = HomeController;
