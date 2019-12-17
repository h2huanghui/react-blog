import React, { useState,useEffect } from 'react'
import marked from 'marked'
import servicePath from '../config/api'
import axios from 'axios'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'

const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0) //文章ID,0:新增;非0:修改
    const [articleTitle, setArticleTitle] = useState('') //文章标题
    const [articleContent, setArticleContent] = useState('') //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState() //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState() //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) //文章类别信息
    const [selectedType, setSelectType] = useState('请选择') //选择的文章类别

    useEffect(() => {
        getTypeInfo()
    },[])
    
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    }); 

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url:servicePath.getTypeInfo,
            withCredentials:true
        }).then(res => {
            if (res.data.data == '未登录') {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data) //react hooks设置值
            }
        })
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder='博客标题'
                                size='large'
                            />
                        </Col>

                        <Col span={4}>
                            <Select defaultValue={selectedType} size='large'>
                                {
                                    typeInfo.map((item,index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                                onPressEnter={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className='show-html'
                                dangerouslySetInnerHTML = {{__html:markdownContent}}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24} className='operate-btns'>
                            <Button type='primary' size='large'>暂存草稿</Button>
                            <Button type='primary' size='large' className='publish-btn'>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <TextArea
                                className='introduce-content'
                                rows={4}
                                placeholder='文章简介'
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                            >
                            </TextArea>
                            <div
                                className='introduce-html'
                                dangerouslySetInnerHTML={{__html: introducehtml}}
                            >
                            </div>
                        </Col>
                        <Col span={12}>
                            <DatePicker />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle
