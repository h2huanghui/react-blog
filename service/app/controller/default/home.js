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
  //获取文章列表
  async getArticleList() {
    const QUERY_STR = `${TABLE_NAME1}.id,title,introduce,addTime,view_count,typeName`

    let sql = `select ${QUERY_STR} from ${TABLE_NAME1},${TABLE_NAME2}
    where ${TABLE_NAME1}.blog_type_id  = ${TABLE_NAME2}.id`

    const results = await this.app.mysql.query(sql)

    this.ctx.body = {
      data: results
    }
  }

  //得到文章详情
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

  //select
  //得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('blog_type') //表名cls
    this.ctx.body = {
      data: result
    }
  }

  //根据类别ID获取文章列表
  async getListById() {
    //接口传递
    let id = this.ctx.params.id

    const QUERY_STR = `${TABLE_NAME1}.id,title,introduce,addTime,view_count,typeName`

    let sql = `select ${QUERY_STR} from ${TABLE_NAME1},${TABLE_NAME2}
    where ${TABLE_NAME1}.blog_type_id  = ${TABLE_NAME2}.id and ${TABLE_NAME2}.id=${id}`

    const results = await this.app.mysql.query(sql)

    this.ctx.body = {
      data: results
    }
  }
}

module.exports = HomeController;
