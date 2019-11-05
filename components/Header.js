import React from 'react'
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => (
    <div className='header'>
        <Row type='flex' justify='center'>
            <Col xs={24} sm={24} md={10} lg={10} xl={10} className='left'>
                <span className='header-logo'>SmartHui</span>
                <span className='header-txt'>Good good Study, Day day up</span>
            </Col>

            <Col xs={24} sm={24} md={14} lg={8} xl={6}>
                <Menu mode='horizontal'>
                    <Menu.Item key='home'>
                        <Icon type='home' />
                        首页
                    </Menu.Item>

                    <Menu.Item key='video'>
                        <Icon type='youtube' />
                        文章
                    </Menu.Item>

                    <Menu.Item key='life'>
                        <Icon type='smile' />
                        生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>

)



export default Header