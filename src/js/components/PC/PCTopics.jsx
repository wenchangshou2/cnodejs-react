import { Link } from 'react-router-dom';
import React from 'react';
import transformDate from '../../../utils/transformDate';
import { Card, Avatar, Row, Col } from 'antd';
import { get_article, getUser } from '../../actions';
import { connect } from 'react-redux';


// import App from './App'
class PCTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
      authorInfo: '',
    };
  }
  componentWillMount(nextProps) {
    const topicId = this.props.match.params.id;
    const options = {
      method: 'GET',
    };
    this.props.dispatch(get_article(topicId))
  }
  componentWillReceiveProps(nextProps){
    console.log('333', this.props.topic.author.loginname)
    let userId=this.props.topic.author.loginname;
    let nextUserId=nextProps.topic.author.loginname;
    let topicId=this.props.match.params.id;
    let nextTopicId=nextProps.match.params.id;
    if(userId!==nextUserId){
      this.props.dispatch(getUser(nextUserId));
    }
    if (topicId !== nextTopicId) {
      this.props.dispatch(get_article(nextTopicId));
    }
  }
  getTopicList() {
    const topicId = this.props.match.params.id;
    this.props.dispatch(get_article(topicId))
  }
  getAuthorInfo(user) {
    // const topicId = this.props.match.params.id;
    // this.props.dispatch(get_article(topicId))
  }
  render() {
    // const { news, authorInfo } = this.state;
    let { topic,user } = this.props;
    console.log('topic', topic)
    const repliesArray = topic.replies.length > 0
      ? topic.replies.map((itm, index) => (
        <div key={index} className="cell reply_area reply_item" reply_id={itm.id}>
          <div className="author_content">
            <Link to={`/user/${itm.author.loginname}`} className="user_avatar">
              <img src={itm.author.avatar_url} title={itm.author.loginname} />
            </Link>
            <div className="user_info">
              <Link className="dark reply_author" to={`/user/${itm.author.loginname}`}>{itm.author.loginname}</Link>
              <Link className="reply_time" to={`#${itm.id}`}>{index + 1}楼 {transformDate(itm.create_at)}</Link>
            </div>
            <div className="user_action">
              <span>
                <i className="fa up_btn fa-thumbs-o-up" title="喜欢"/>
                <span className="up-count">
                  {itm.visit_count}
                </span>
              </span>
            </div>
          </div>

          <div className="reply_content from-alsotang">
            <div className="mobile_reply_content markdown-body" dangerouslySetInnerHTML={{ __html: itm.content }}>
            </div>
          </div>
          <div className="clearfix">
            <div className="reply2_area" />
          </div>
        </div>
      )) : '';
    console.log('ll', repliesArray,topic.length);
    let recentTopics = [];
    if (user.recent_topics !== undefined) {
      console.log('user', user)
      recentTopics = user['recent_topics'].map((itm, index) => (
        <li key={index}>
          <div>
            <Link className="topic_title2" to={`/topic/${itm.id}`} title={itm.title}>
              {itm.title}
            </Link>
          </div>

        </li>
      ));
      recentTopics = recentTopics.splice(5)
    }
    return (
      <div
        className="panel"
        style={{
          marginTop: '20px',
        }}
      >
        <Row>
          <Col span={2}/>
          <Col span={13}>
            <div className="header topic_header">
              <span className="topic_full_title">
                <span
                  className={topic.top
                    ? 'put_top'
                    : ''}
                >
                置顶
                </span>
                {/* 测试请发到客户端测试专区，违规影响用户的，直接封号 */}
                {topic.title}
              </span>
              <div className="changes">
                <span>{topic.create_at}</span>
                <span>作者：<Link to={`/user/${topic.author.loginname}`}></Link>
                </span>
                <span>{topic.visit_count}
                  次浏览</span>
                <span>最后一次编辑是{'一年前'}</span>
                {/* <span>来自 {this.strTocaTegory()}</span> */}
              </div>
            </div>
            <div className="inner topic">


                <div className="mobile_reply_content markdown-body" dangerouslySetInnerHTML={{__html:topic.content}}>
                </div>
              {/* <ReactMarkdown source={news.content} mode="skip" />, */}
            </div>

            <Card
              title={`${topic.reply_count}条回答`}
              style={{
                display: topic.reply_count === 0
                  ? 'none'
                  : '',
              }}
            >
              {repliesArray}
            </Card>
          </Col>
          <Col
            span={5}
            style={{
              marginLeft: '20px',
            }}
          >
            <Card title="作者">
              <div>
                <Link className="user_avatar" to={topic.author.loginname}>
                  {/* <img src={news.author.avatar_url} title={author_name}/> */}
                  <Avatar src={topic.author.avatar_url} />
                </Link>
                <span className="user_name">
                  <Link className="dark" to={`/user/${topic.author.loginname}`}>{topic.author.loginname}</Link>
                </span>
                <div className="board clearfix">
                  <div className="floor">
                    <span className="big">积分： {user.score}
                    </span>
                  </div>
                </div>
                <div className="space clearfix" />
                <span className="signature" />
              </div>
            </Card>
            <Card title="作者其它的话题" className="mtp10">
              <ul className="unstyled">
                {recentTopics}
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { article,user } = state
  const { topic } = article
  console.log('user',user)
  return {
    topic,user
  }
}
export default connect(mapStateToProps)(PCTopics);
