
import React from 'react';
import { connect } from 'react-redux'
import { Affix, Row, Col, Icon, Avatar } from 'antd';
import { get_article } from '../../actions/index';
import { Link } from 'react-router-dom';

import transformDate from '../../../utils/transformDate';
import MobileHeader from './MobileHeader.jsx';
import MobileReply from './MobileReply.jsx';


class MobileTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicId: '',
            topic: ''
        }
    }
    componentWillMount() {
        this.props.dispatch(get_article(this.props.match.params.id))
    }
    strToTop(isGood, isTop, tab) {
        if (isGood || isTop) {
            return '置顶'
        }
        switch (tab) {
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
    onLike(e) {
        console.log('ll', e.target.ups)
    }
    render() {
        const { topic, login, switchSupportInfo, dispatch,currentTopicId } = this.props
       
        return (
            <div>
                <MobileHeader />
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
                    <h1 style={{ textAlign: 'center', padding: '5px' }}>{topic.title}</h1>
                </div>
                <div className="mobile_article_content">
                    {/* <ReactMarkdown source={topic.content} mode="skip"/> */}
                    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: topic.content }}>
                        {/* {topic.content} */}
                    </div>
                </div>
                <div className="mobile_article_reply">
                    <MobileReply replies={topic.replies} {...({login,dispatch,switchSupportInfo,currentTopicId})} />
                    {/* <div>
                        {topic.reply_count}次回复
                        {}
                        {reply_list}
                    </div> */}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { article, login, user } = state;
    const { switchSupportInfo,topic,currentTopicId } = article;
    return {
        topic,
        login,
        user,
        switchSupportInfo,
        currentTopicId
    }
}
export default connect(mapStateToProps)(MobileTopic) ;