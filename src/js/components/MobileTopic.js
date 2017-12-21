
import React from 'react';
import {connect} from 'react-redux'
import { Affix, Row, Col ,Icon} from 'antd';
import {getArticlePost} from '../actions/index'
let ReactMarkdown = require('react-markdown');
import {Link} from 'react-router-dom';

import transformDate from '../../utils/transformDate';


class MobileTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            topicId:'',
            topic:''
        }
    }
    componentDidMount(){
        console.log(this.props)
        this.props.dispatch(getArticlePost(this.props.match.params.id))
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
        console.log('post111111',topic)
        return (
            <div>
                <Affix >
                    <Row type="flex" style={{height:'40px',backgroundColor:'rgb(0, 188, 212)'}} >
                        <Col span={6}>
                            <Link to="/">
                                <Icon type="rollback" className="mobileIcon" style={{fontSize:'30px'}}/>
                            </Link>
                        </Col>
                        <Col span={12}>
                            文章详情
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                </Affix>
                <div className="mobile_article_title">
                    <span className="mobile_article_tab">{this.strToTop(topic.tab)}</span>
                    {topic.title}
                </div>
                <div className="mobile_article_extra">
                    <span className="mobile_article_create_at">{transformDate(topic.create_at)}</span>
                    <span>作者:{topic['author']==undefined?"":topic["author"]['loginname']}</span>
                    <span>{topic.visit_count}次浏览</span>
                </div>
                <hr/>
                <div className="mobile_article_content">
                    {/* <ReactMarkdown source={topic.content} mode="skip"/> */}
                    <div class="markdown-body" dangerouslySetInnerHTML={{__html:topic.content}}>
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
    const {postTopic} =state
    const topic=postTopic['topic']||[]
    console.log('ffffffff',topic)
    return {
       topic 
    }
}
export default  connect(mapStateToProps)(MobileTopic) 