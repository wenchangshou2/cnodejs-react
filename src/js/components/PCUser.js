import React from 'react';

import {Row, Col, Card, Button,Avatar} from 'antd';
import ListHeader from './listHeader';
import PageList from './pageList';
import {Link} from 'react-router-dom';
import transformDate from '../../utils/transformDate';

// import App from './App'
export default class PCUser extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userinfo:'',
            username:''
        }
    }
    componentWillMount(){
        console.log(this);
        let username=this.props.match.params.id
        let requestUrl=`https://cnodejs.org/api/v1/user/${username}`
        let options={
            methods:"GET"
        }
        fetch(requestUrl,options).then((response)=>response.json()).then((data)=>{
            this.setState({userinfo:data['data']})
        })
    }
    render() {
        let {userinfo}=this.state;
        let recent_topics=userinfo['recent_topics']!=undefined&&userinfo['recent_topics'].length>0?
        userinfo['recent_topics'].map((itm,index)=>( 
            <div className="cell">
                <Link className="user_avatar pull-left" to={`/user/${itm.author.loginname}`}>
                    <Avatar src={itm.author.avatar_url}/>
                </Link>
                <span className="last_time pull-right">
                    <span className="last_active_time">{transformDate(itm.last_reply_at)}</span>
                </span>
                <div className="topic_title_wrapper">
                    <Link className="topic_title3" to={`/topic/${itm.id}`} title={itm.title}>
                        {itm.title}
                    </Link>
                </div>
            </div>
        )):''
        return (
            <div
                className="panel"
                style={{
                marginTop: '20px'
            }}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <Card>
                            <div className="inner userinfo">
                                <div className="user_big_avatar">
                                    <Avatar src={userinfo.avatar_url} className="user_avatar"/>
                                </div>
                                <a className="dark">{userinfo['loginname']}</a>
                                <div clsas="user_profile">
                                    <ul className="Unstyled">
                                        <span className="big">{userinfo['score']}</span>积分
                                        <li>
                                            <Link to={`/user/${userinfo['loginname']}/collections`}>
                                                <span className="big collect-topic-count">{userinfo['score']}</span>个话题收藏
                                            </Link>
                                        </li>
                                        <li>
                                            <i className="fa fa-lg fa-fw fa-github"></i>
                                            <a className="dark" href="#" target="_blank">
                                            {`@${userinfo.loginname}`}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <p className="col_fade">注册时间 {transformDate(userinfo.create_at)}</p>
                            </div>
                        </Card>
                        <Card title="最近创建的话题" className="mtp10">
                            {recent_topics}
                        </Card>
                    </Col>
                    <Col
                        span={5}
                        style={{
                        marginLeft: '20px'
                    }}>
                        <Card title="友情社区" className="mtp10">
                            <ol className="friendship-community">
                                <li>
                                    <a href="https://ruby-china.org/">
                                        <img src="/src/images/ruby-china-20150529.png"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="http://golangtc.com/">
                                        <img src="/src/images/golangtc-logo.png"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="http://phphub.org/">
                                        <img src="/src/images/phphub-logo.png"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="http://testerhome.com/">
                                        <img src="/src/images/last-image.png"/>
                                    </a>
                                </li>
                            </ol>
                    </Card>
                    <Card title="客户端二维码" className="mtp10 cnode-app-download">
                        <img src="/src/images/matrixCode.png"/>
                    </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}