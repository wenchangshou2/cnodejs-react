import React from 'react';
import { get_user } from '../actions/index';
import MobileList from './MobileList';
import {connect} from 'react-redux'
import transformDate from '../../utils/transformDate';
import {Card} from 'antd';


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
    }
    render(){
        console.log('user',this.props.user)
        const {user}=this.props
        return (
            <div>
                <p><img src={user.avatar_url}/></p>
                <p>{user.loginname}</p>
                <p>积分:{user.score}</p>
                <p>注册于:{transformDate(user.create_at)}</p>
                <Card title="收藏的话题">
                    
                </Card>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    const {
        user
    }=state;
    console.log('11',user['user'])
    return {
        user:user['user']
    }
}
export default connect(mapStateToProps)(MobileUser)