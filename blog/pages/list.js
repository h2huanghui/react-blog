import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import axios from 'axios'
import servicePath from '../config/api'
import Link from 'next/link'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const MyList = (list) => {
  const [myList, setMyList] = useState(list.data)
  useEffect(() => {
    setMyList(list.data)
  })

  const renderer = new marked.Renderer()
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
  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout='vertical'
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className='list-title'>
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className='list-icon'>
                  <span><Icon type="calendar" /> {item.addTime}</span>
                  <span><Icon type="folder" /> {item.typeName}</span>
                  <span><Icon type="fire" /> {item.view_count}</span>
                </div>
                <div className='list-context'
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                ></div>
              </List.Item>
            )}
          />
        </Col>

        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then((res) => {
      resolve(res.data)
    })
  })
  return await promise 
}

export default MyList
