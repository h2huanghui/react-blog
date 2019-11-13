import React from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Tocify from '../components/tocify.tsx'

import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import '../static/style/components/detail.css'

import servicePath from '../config/api'

const Detail = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  // ###(level) hh(text)
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a href="#${anchor}" id="${anchor}" class="anchor-fix">
      <h${level}>${text}</h${level}>
    </a>`
  }

  marked.setOptions({
    renderer: renderer, //必须填写
    gfm: true, //启动类似Gitgub样式的Markdown
    pedantic: false,//只解析符合Markdown定义的,不修正Markdown错误(false代表容错)
    sanitize: false, //原始输出,忽略HTML标签(不忽略)
    tables: true,//支持Github形式的表格
    breaks: false,//支持Github换行符,必须打开gmf选项
    smartLists: true,//优化列表输出
    highlight: function (code) {
      return hljs.highlightAuto(code).value //自动检测返回
    }
  })

  let html = marked(props.article_content) //用marked

  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/list">视频列表</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频详情</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className='detail-title'>从0开始构建Webpack</div>

          <div className='list-icon'>
            <span><Icon type="calendar" /> 2019-11-06</span>
            <span><Icon type="folder" /> 2019-11-06</span>
            <span><Icon type="fire" /> 2019-11-06</span>
          </div>

          <div className='detail-content'
            dangerouslySetInnerHTML={{ __html: html }}
          >
          </div>


        </Col>

        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix>
            <div className='detail-nav'>
              <div className="nav-title">文章目录</div>

              {/* <MarkNav
                className="article-menu"
                source={props.article_content}
                ordered={false}
              /> */}
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>

            </div>
          </Affix>
        </Col>
        <Footer />
      </Row>
    </>

  )
}

Detail.getInitialProps = async (context) => {
  // console.log(context.query.id)
  let id = context.query.id
  let url = servicePath.getArticleById
  const promise = new Promise(resolve => {
    axios(`${url}${id}`).then(res => {
      console.log(res.data.data[0])
      resolve(res.data.data[0])
    })
  })
  return await promise
}



export default Detail
