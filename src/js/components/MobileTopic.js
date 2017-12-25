
import React from 'react';
import {connect} from 'react-redux'
import { Affix, Row, Col ,Icon,Avatar} from 'antd';
import {get_article} from '../actions/index'
let ReactMarkdown = require('react-markdown');
import {Link} from 'react-router-dom';

import transformDate from '../../utils/transformDate';
import MobileHeader from './MobileHeader';


class MobileTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            topicId:'',
            topic:''
        }
    }
    componentWillMount(){
        this.props.dispatch(get_article(this.props.match.params.id))
    }
    strToTop(isGood, isTop, tab) {
        if(isGood||isTop){
            return '置顶'
        }
        switch(tab){
            case 'share':
                return '分享'
            case 'ask':
                return '问答'
            case 'job':
                return '求职'
            case 'good':
                return '置顶'
        }
    }

    render() {
        const {topic}=this.props
        let reply_list=topic.reply_count>0?
        topic['replies'].map((reply,idx)=>( 
            <div style={{height:'150px'}}>
                <div className="mobile_reply_author">
                    <Row>
                        <Col span={4}>
                            <Link to={`/user/${reply.author.loginname}`} className="mobile_user_avatar">
                                <img src={reply.author.avatar_url} title={reply.author.loginname}/>
                            </Link>
                        </Col>
                        <Col span={16}>
                            <div>{idx}楼 &nbsp;&nbsp;{transformDate(reply.create_at)}</div>
                        </Col>
                        <Col span={4}>
                            <div>
                                <Icon type="like" />
                                {reply.ups.length}
                            </div>
                        </Col>
                    </Row>
                </div>
                <br/><br/>
                <div className="mobile_reply_content markdown-body" dangerouslySetInnerHTML={{__html:reply.content}}>
                </div>
            </div>
        )):''
        return (
            <div>
                <MobileHeader/>
                <div className="mobile_article_author">
                    <Row>
                        <Col span={4}>
                            <img src={topic.author.avatar_url} />
                        </Col>
                        <Col span={13}>
                            <Link to={`/user/${topic.author.loginname}`}>
                                {topic.author.loginname}
                            </Link>
                        </Col>
                        <Col span={7}>
                            <p>发表于{transformDate(topic.create_at)}</p>
                            <p>
                                <Icon type="message" />{topic.replies.length}&nbsp;&nbsp;
                                <Icon type="eye" />{topic.visit_count}
                            </p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <h1 style={{textAlign:'center',padding:'5px'}}>{topic.title}</h1>
                </div>
                <div className="mobile_article_content">
                    {/* <ReactMarkdown source={topic.content} mode="skip"/> */}
                    <div className="markdown-body" dangerouslySetInnerHTML={{__html:topic.content}}>
                        {/* {topic.content} */}
                    </div>
                </div>
                <div className="mobile_article_reply">
                    <div>
                        {topic.reply_count}次回复
                        {reply_list}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    const {article} =state
    console.log('111',state)
    const {topic}=article
    return {
       topic 
    }
}
export default  connect(mapStateToProps)(MobileTopic) 