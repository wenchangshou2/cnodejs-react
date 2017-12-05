import React from 'react';

import {Row, Col, Card, Button} from 'antd';
import ListHeader from './listHeader';
import PageList from './pageList';
import PCRightPanel from './PCRightPanel';
const ReactMarkdown = require('react-markdown')

// import App from './App'
export default class PCTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            news:''
        }
        
    }
    componentWillMount(){
        let topicId=this.props.match.params.id;
        console.log(topicId);
        let options = {
            method: 'GET',
            qs:{
                mdrender:false
            }
        }
        let requestUrl=`https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${false}`
        fetch(requestUrl,options).then((response)=>response.json()).then((data)=>{
            this.setState({news:data['data']})
        })
    }
    strTocaTegory(str){
        if(str==='share'){
            return '分享'
        }else if(str==='ask'){
            return '问答'
        }else if(str==='job'){
            return '招聘'
        }
    }
    render() {
        const {news} = this.state;
        console.log(news['author'],typeof news['author']);
        console.log(news['replies']);
        const len=news['replies']===undefined?0:news['replies'].length
        console.log('len',len);
        let replies_array=len>0?
            news['replies'].map((itm,index)=>{
                console.log(itm);
            }):''
        // console.log(news);
        // news.map((itm,index)=>{

        // })
        // let replyList=news['replies'].map((itm,index)=>{
        //     console.log(itm);
        // })
        // console.log(news)
        // console.log('replies',news['replies'])
        // console.log(news['replies'].length);
        // let replies=news['replies'].length>0?
        //     news['replies'].map((r,index)=>{
        //         console.log(r);
        //     }):''

        return (
            <div
                className="panel"
                style={{
                marginTop: '20px'
            }}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={13}>
                    <div className="header topic_header">
                        <span className="topic_full_title">
                        <span className={news.top?'put_top':''}>置顶</span>
                            {/* 测试请发到客户端测试专区，违规影响用户的，直接封号 */}
                            {news.title}
                        </span>
                        <div className="changes">
                            <span>{news.create_at}</span>
                            {/* <span>作者：<a href={`/user/${news.author.loginname}`}></a></span> */}
                            <span>{news.visit_count} 次浏览</span>
                            <span>最后一次编辑是{'一年前'}</span>
                            {/* <span>来自 {this.strTocaTegory()}</span> */}
                        </div>
                    </div>
                    <div className="inner topic">
                    <ReactMarkdown source={news.content} mode="skip" />,
                    </div>

                    <Card title={`${news.reply_count}条回答`}>
                    </Card>
                    </Col>
                    <Col
                        span={5}
                        style={{
                        marginLeft: '20px'
                    }}>
                    <PCRightPanel/>
                    </Col>
                </Row>
            </div>
        )
    }
}