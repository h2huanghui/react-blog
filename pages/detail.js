import React from 'react'
import Head from 'next/head'
import { Row,Col,Icon,Breadcrumb} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/components/detail.css'

const Detail = () => (
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
          <span><Icon type="calendar"/> 2019-11-06</span>
          <span><Icon type="folder" /> 2019-11-06</span>
          <span><Icon type="fire" /> 2019-11-06</span>
        </div>

        <div className='detail-content'>
          详情
        </div>

      </Col>

      <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Advert />
      </Col>
      <Footer />
    </Row>
  </>
)

export default Detail
