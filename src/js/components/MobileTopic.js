
import React from 'react';
import {connect} from 'react-redux'
import { Affix, Row, Col ,Icon} from 'antd';
import {getArticlePost} from '../actions/index'
let ReactMarkdown = require('react-markdown');

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
        console.log('post111111',topic)
        return (
            <div>
                <Affix >
                    <Row type="flex"style={{height:'40px',backgroundColor:'rgb(0, 188, 212)'}}>
                        <Col span={6}>
                        <Icon type="rollback" className="mobileIcon"/>

                        </Col>
                        <Col span={12} justify="center">
                            详情
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
                <ReactMarkdown source={topic.content} mode="skip"/>
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