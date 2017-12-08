import React from "react";

import { Card, Avatar, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
let ReactMarkdown = require('react-markdown');
import transformDate from '../../utils/transformDate';

// import App from './App'
export default class PCTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
      authorInfo: ''
    };
  }
  getTopicList() {
    let topicId = this.props.match.params.id;
    console.log(topicId);
    let options = {
      method: 'GET',
      qs: {
        mdrender: false
      },
    };
    const requestUrl = `https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${false}`;
    fetch(requestUrl, options).then((response) => response.json()).then((data) => {
      this.setState({news: data['data']});
      this.getAuthorInfo(data['data']['author']['loginname']);
        })
    }
    getAuthorInfo(user) {
        let options = {
            method: 'GET'
        }
        let requestUrl = `https://cnodejs.org/api/v1/user/${user}`
        fetch(requestUrl, options).then((response) => response.json()).then((data) => {
            this.setState({authorInfo: data['data']})
        })

    }
    strTocaTegory(str) {
        if (str === 'share') {
            return '分享'
        } else if (str === 'ask') {
            return '问答'
        } else if (str === 'job') {
            return '招聘'
        }
    }
    componentWillMount(nextProps) {

        let topicId = this.props.match.params.id;
        console.log(topicId);
        let options = {
            method: 'GET',
            qs: {
                mdrender: false
            }
        }
        let requestUrl = `https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${false}`
        fetch(requestUrl, options).then((response) => response.json()).then((data) => {
            this.setState({news: data['data']})
            this.getAuthorInfo(data['data']['author']['loginname'])

        })
        console.log('will update')
    }
    render() {
        console.log('render');
        const {news, authorInfo} = this.state;
        if (news['author'] === undefined) 
            return ''
        let author_name = news['author'] == undefined
            ? ''
            : news.author.loginname
        const len = news['replies'] === undefined
            ? 0
            : news['replies'].length
        var replies_array = len > 0
            ? news['replies'].map((itm, index) => (
                <div className="cell reply_area reply_item" reply_id={itm.id}>
                    <div class="author_content">
                        <Link to={`/user/${itm.author.loginname}`} className="user_avatar">
                            <img src={itm.author.avatar_url} title={itm.author.loginname}/>
                        </Link>
                        <div className="user_info">
                            <Link class="dark reply_author" to={`/user/${itm.author.loginname}`}>{itm.author.loginname}</Link>
                            <Link class="reply_time" to={`#${itm.id}`}>{index + 1}楼 {transformDate(itm.create_at)}</Link>
                        </div>
                        <div className="user_action">
                            <span>
                                <i className="fa up_btn fa-thumbs-o-up" title="喜欢"></i>
                                <span className="up-count">{itm.visit_count}</span>
                            </span>
                        </div>
                    </div>
                    <div className="reply_content from-alsotang">
                        <div>
                            <ReactMarkdown source={itm.content} mode="skip"/>
                        </div>
                    </div>
                    <div className="clearfix">
                        <div className="reply2_area"></div>
                    </div>

                </div>
            ))
            : ''
        let recent_topics = []
        if (authorInfo['recent_topics'] != undefined) {
            recent_topics = authorInfo['recent_topics'].map((itm, index) => (
                <li>
                    <div>
                        <Link className="topic_title2" to={`/topic/${itm.id}`} title={itm.title}>
                            {itm.title}
                        </Link>
                    </div>

                </li>
            ))
            recent_topics = recent_topics.splice(5)
        }

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
                                <span
                                    className={news.top
                                    ? 'put_top'
                                    : ''}>置顶</span>
                                {/* 测试请发到客户端测试专区，违规影响用户的，直接封号 */}
                                {news.title}
                            </span>
                            <div className="changes">
                                <span>{news.create_at}</span>
                                <span>作者：<Link to={`/user/${author_name}`}></Link>
                                </span>
                                <span>{news.visit_count}
                                    次浏览</span>
                                <span>最后一次编辑是{'一年前'}</span>
                                {/* <span>来自 {this.strTocaTegory()}</span> */}
                            </div>
                        </div>
                        <div className="inner topic">
                            <ReactMarkdown source={news.content} mode="skip"/>,
                        </div>

                        <Card
                            title={`${news.reply_count}条回答`}
                            style={{
                            display: news.reply_count == 0
                                ? 'none'
                                : ''
                        }}>
                            {replies_array}
                        </Card>
                    </Col>
                    <Col
                        span={5}
                        style={{
                        marginLeft: '20px'
                    }}>
                        <Card title="作者">
                            <div>
                                <Link className="user_avatar" to={author_name}>
                                    {/* <img src={news.author.avatar_url} title={author_name}/> */}
                                    <Avatar src={news.author.avatar_url}/>
                                </Link>
                                <span className="user_name">
                                    <Link className="dark" to={`/user/${author_name}`}>{author_name}</Link>
                                </span>
                                <div className="board clearfix">
                                    <div className="floor">
                                        <span class="big">积分： {authorInfo.score}
                                        </span>
                                    </div>
                                </div>
                                <div className="space clearfix"></div>
                                <span class="signature"></span>
                            </div>
                        </Card>
                        <Card title="作者其它的话题" className="mtp10">
                            <ul className="unstyled">
                                {recent_topics}
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}