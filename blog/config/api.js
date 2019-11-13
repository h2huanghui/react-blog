let ipUrl = 'http://localhost:7002/default/' //前台

let servicePath = {
    getArticleList: `${ipUrl}getArticleList`, //首页文章列表接口
    getArticleById: `${ipUrl}getArticleById/`,  //文章详细页内容接口,需要接收参数
    getTypeInfo: `${ipUrl}getTypeInfo`, //类型信息
    getListById:`${ipUrl}getListById/` //根据类别id获取文章列表
}

export default servicePath