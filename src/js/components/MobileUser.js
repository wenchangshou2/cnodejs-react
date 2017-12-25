import React from 'react';
import { get_user,get_user_topic_collect } from '../actions/index';
import MobileList from './MobileList';
import {connect} from 'react-redux'
import transformDate from '../../utils/transformDate';
import {Card} from 'antd';
import MobileHeader from './MobileHeader';
import {Link} from 'react-router-dom';


class MobileUser extends React.Component{
    constructor(props){
        super(props)
        console.log('ff')
    }
    componentWillMount(){
        let user=this.props.match.params.id
        // fetch(`https://cnodejs.org/api/v1/user/${user}`).then((response)=>response.json()).then((json)=>{
        //     console.log('json',json)
        // })
        this.props.dispatch(get_user(user))
        this.props.dispatch(get_user_topic_collect(user))
    }
    render(){
        console.log('user',this.props.user)
        const {user,user_topic_collect}=this.props
        let user_topic_collect_list=user_topic_collect.map((item,index)=>{
            return(
                <div key={index}>
                    <div className="user_topic_collect">
                        <Link to={`/user/${item.author!=undefined?item.author.loginname:''}`}>
                        <img className="mobile_user_topic_collect_icon" src={item.author.avatar_url}/>
                        </Link>
                        <Link to={`/topic/${item.id}`}>
                        <span className="mobile_user_topic_collect_title">{item.title}</span>
                        </Link>
                    </div>
                </div>
            )
        })
        let user_recent_replies=user.recent_replies!=undefined?user.recent_replies.map((item,index)=>( 
            <div key={index}>
                <div className="user_topic_collect">
                    <Link to={`/user/${item.author!=undefined?item.author.loginname:''}`}>
                    <img className="mobile_user_topic_collect_icon" src={item.author.avatar_url}/>
                    </Link>
                    <Link to={`/topic/${item.id}`}>
                    <span className="mobile_user_topic_collect_title">{item.title}</span>
                    </Link>
                </div>
            </div>
        )):''
        let user_recent_topics=user.recent_topics!=undefined?user.recent_topics.map((item,index)=>( 
            <div key={index}>
                <div className="user_topic_collect">
                    <Link to={`/user/${item.author!=undefined?item.author.loginname:''}`}>
                    <img className="mobile_user_topic_collect_icon" src={item.author.avatar_url}/>
                    </Link>
                    <Link to={`/topic/${item.id}`}>
                    <span className="mobile_user_topic_collect_title">{item.title}</span>
                    </Link>
                </div>
            </div>
        )):''
        return (
            <div>
                <MobileHeader/>
                <p><img src={user.avatar_url}/></p>
                <p>{user.loginname}</p>
                <p>积分:{user.score}</p>
                <p>注册于:{transformDate(user.create_at)}</p>
                <Card title="收藏的话题" style={{width:'95%',margin:'0 auto',marginBottom:'5px'}}>
                    {user_topic_collect_list}
                </Card>
                <Card title="最近参与的话题" style={{width:'95%',margin:'0 auto',marginBottom:'5px'}}>
                    {user_recent_replies}
                </Card>
                <Card title="最近创建的话题" style={{width:'95%',margin:'0 auto',marginBottom:'5px'}}>
                    {user_recent_topics}
                </Card>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    const {
        user,user_topic_collect
    }=state;

    console.log('11',user_topic_collect['user_topic_collect'])
    return {
        user:user['user'],
        user_topic_collect:user_topic_collect['user_topic_collect']
    }
}
export default connect(mapStateToProps)(MobileUser)