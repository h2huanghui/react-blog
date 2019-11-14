import React, { useState } from 'react'
import { Card, Icon, Input, Button, Spin } from 'antd'
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
        axios.post(servicePath.login, {
            userName,
            password
        }).then((res) => {
            if (res.data.code === 200) {
                console.log(res.data.data)
                setIsLoading(false)
                //路由跳转
                props.history.push('/home')
            } else {
                console.log('error')
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
                    <Input
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