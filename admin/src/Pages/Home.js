import React, { useState } from 'react'
import { Row, Col, Input, Select, DatePicker } from 'antd'

import 'antd/dist/antd.css'
import '../static/css/Home.css'


const Home = () => {
    const { Option } = Select
    const { RangePicker } = DatePicker
    const [mode, setMode] = useState(['date', 'date'])
    const [value,setValue] = useState([])
    console.log(mode)
    console.log(value)
    const handlePanelChange = (value, mode) => {
        // console.log(value,mode)
        setValue(value)
        setMode([mode[0],mode[1]])
    }

    const handleChange = value => {
        // console.log(value)
        setValue(value)
    }

    return (
        <div className='table-wrap'>
            <Row type='flex' justify='space-between' className='label-wrap'>
                <Col span={2}></Col>
                <Col span={2}>姓名</Col>
                <Col span={2}>工号</Col>
                <Col span={2}>打车类型</Col>
                <Col span={2}>单价(元/公里)</Col>
                <Col span={2}>价格</Col>
                <Col span={2}>日期</Col>
                <Col span={4}>上车时间-下车时间</Col>
                <Col span={2}>地点</Col>
                <Col span={2}>备注</Col>
                <Col span={2}>操作</Col>
            </Row>


            <Row type='flex' justify='space-between' className='content-wrap'>
                <Col span={2}></Col>
                <Col span={2}>
                    <Input
                        size='small'
                    />
                </Col>
                <Col span={2}>
                    <Input
                        size='small'
                    />
                </Col>
                <Col span={2}>
                    <Select defaultValue="0" size='small'>
                        <Option value="0">出租车</Option>
                        <Option value="1">快车</Option>
                    </Select>
                </Col>
                <Col span={2}>
                    <Input
                        size='small'
                    />
                </Col>
                <Col span={2}>
                    <Input
                        size='small'
                    />
                </Col>
                <Col span={2}>
                    <DatePicker
                        size='small'
                        placeholder='Select'
                    />
                </Col>
                <Col span={4}>
                    <RangePicker
                        mode='time'
                        showTime
                        size='small'
                        format='HH:mm'
                        value={value}
                        mode={mode}
                        showTime
                        onChange={handleChange}
                        onPanelChange={handlePanelChange}
                    />
                </Col>

                <Col span={2}>
                    <Input
                        size='small'
                    />
                </Col>
                <Col span={2}>
                    <Input
                        size='small'
                    />
                </Col>
                <Col span={2}>操作</Col>
            </Row>
        </div>
    )

}

export default Home