import React, { useState } from 'react'
import { Card, Icon, Input, Button, Spin, message } from 'antd'
import servicePath from '../config/api'
import axios from 'axios'

import 'antd/dist/antd.css'
import '../static/css/Login.css'

function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            })
            return false
        } else if (!password) {
            message.error('密码不能为空') 
            setTimeout(() => {
                setIsLoading(false)
            })
            return false
        }

        let dataProps = {
            'userName': userName,
            'password':password
        }
        axios({
            method: 'post',
            url: servicePath.login,
            data: dataProps,
            withCredentials: true //前端后端公用session,跨域检验cookie
        }).then(res => {
            setIsLoading(false)
            if (res.data.code === '200') {
                localStorage.setItem('openId',res.data.openId)
                //路由跳转
                props.history.push('/index')
            } else {
                message.error('用户名密码错误')
            }
        })

    }

    return (
        <div className='login-wrap'>
            <Spin spinning={isLoading}>
                <Card style={{ width: '400px' }} title='Smart Blog System'>
                    <Input
                        id='userName'
                        placeholder='please enter userName'
                        size='large'
                        prefix={<Icon type='user' />}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <br />
                    <br />
                    <Input.Password
                        id='password'
                        placeholder='please enter password'
                        size='large'
                        prefix={<Icon type='key' />}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button
                        type='primary'
                        size='large'
                        block
                        onClick={handleClick}
                    >
                        Login In
                    </Button>

                </Card>
            </Spin>
        </div>
    )
}

export default Login