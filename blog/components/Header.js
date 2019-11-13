import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/api'
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => {
    const [navArray, setNavArray] = useState([])
    //useEffect(异步)第一个参数是一个函数,第二个参数为空表示只执行一次。如果第二个参数为[navArray],则表示navArray变化时执行
    useEffect(() => {
        //声明fetchData变量(也就是一个方法),方法里面异步
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then((res) => {
                return res.data.data
            })
            setNavArray(result)
            console.log(result)
        }
        fetchData()

    }, [])

    const handleClick = (e) => {
        if (e.key === '0') {
            Router.push('/index')            
        } else {
            Router.push(`/list?id=${e.key}`)
        }
    }

    return (
        <div className='header'>
            <Row type='flex' justify='center'>
                <Col xs={24} sm={24} md={10} lg={15} xl={12} className='left'>
                    <span className='header-logo'>SmartHui</span>
                    <span className='header-txt'>Good Good Study, Day Day Up</span>
                </Col>

                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode='horizontal' onClick={handleClick}>
                        <Menu.Item key='0'>
                            <Icon type='home' />
                            首页
                    </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}





export default Header