import { Avatar, Divider } from 'antd'
import  '../static/style/components/author.css'

const Author = () => {
    return (
        <div className='author-wrap comm-box'>
            <div>
                <Avatar src='../static/image/hh.jpg' size={100} />
            </div>
            <div className='author-introduction'>
                前端开发，学无止境，每天进步！！！Just Do It！！！
                <Divider>社交账号</Divider>
                <Avatar size={28} icon='github' className='account' />
                <Avatar size={28} icon='qq' className='account' />
                <Avatar size={28} icon='wechat' className='account' />
            </div>
        </div>
    )
}

export default Author