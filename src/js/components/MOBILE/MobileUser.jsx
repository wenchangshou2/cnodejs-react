import React from 'react';
import { getUser, getUser_topic_collect } from '../../actions/index';
// import MobileList from './MobileList';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import transformDate from '../../../utils/transformDate';
import MobileHeader from './MobileHeader.jsx';

class MobileUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUser: '',
    };
  }
  componentWillMount() {
    const userId = this.props.match.params.id;
    this.props.dispatch(getUser(userId));
    this.props.dispatch(getUser_topic_collect(userId));
  }
  componentWillReceiveProps(newsProps) {
    const userId = this.props.match.params.id;
    const lastUserId = newsProps.match.params.id;
    if (userId != lastUserId) {
      this.props.dispatch(getUser(lastUserId));
      this.props.dispatch(getUser_topic_collect(lastUserId));
    }
  }
  render() {
    const { user, userTopicCollect } = this.props
    console.log('22', userTopicCollect)
    let userTopicCollectList = userTopicCollect.map((item, index) => {
      return (
        <div key={index} className="collectList">
          <div className="user_topic_collect">
            <Link to={`/user/${item.author !== undefined ? item.author.loginname : ''}`}>
              <img src={item.author.avatar_url} />
            </Link>
            <Link to={`/topic/${item.id}`}>
              <span className="mobile_user_topic_collect_title">{item.title}</span>
            </Link>
          </div>
        </div>
      );
    });
    let user_recent_replies = user.recent_replies !== undefined ? user.recent_replies.map((item, index) => (
      <div key={index}>
        <div className="user_topic_collect">
          <Link to={`/user/${item.author != undefined ? item.author.loginname : ''}`}>
            <img className="mobile_user_topic_collect_icon" src={item.author.avatar_url} />
          </Link>
          <Link to={`/topic/${item.id}`}>
            <span className="mobile_user_topic_collect_title">{item.title}</span>
          </Link>
        </div>
      </div>
    )) : '';
    let user_recent_topics = user.recent_topics != undefined ? user.recent_topics.map((item, index) => (
      <div key={index}>
        <div className="user_topic_collect">
          <Link to={`/user/${item.author != undefined ? item.author.loginname : ''}`}>
            <img className="mobile_user_topic_collect_icon" src={item.author.avatar_url} />
          </Link>
          <Link to={`/topic/${item.id}`}>
            <span className="mobile_user_topic_collect_title">{item.title}</span>
          </Link>
        </div>
      </div>
    )) : ''
    return (
      <div >
        <MobileHeader title="用户信息" />
        <div className="LoginUserInfo">
          <img src={user.avatar_url} alt={user.loginname} />
          <span>{user.loginname}</span>
          <span>积分:{user.score}</span>
          <span>注册于:{transformDate(user.create_at)}</span>
        </div>
        <Card title="收藏的话题" style={{ width: '90%', padding: '0', margin: '0 auto' }}>
          {userTopicCollectList}
        </Card>
        <Card title="最近参与的话题" style={{ width: '95%', margin: '0 auto', marginBottom: '5px' }}>
          {user_recent_replies}
        </Card>
        <Card title="最近创建的话题" style={{ width: '95%', margin: '0 auto', marginBottom: '5px' }}>
          {user_recent_topics}
        </Card>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const {
        user, userTopicCollect
    } = state;

  return {
    user,
    userTopicCollect
  }
}
export default connect(mapStateToProps)(MobileUser)