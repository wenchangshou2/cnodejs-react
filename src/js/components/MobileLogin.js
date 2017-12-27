import React from 'react';
import MobileHeader from './MobileHeader'
import {Input,Switch,Button} from 'antd'
import { fetchAccess,getUser } from '../actions/index';
import {connect} from 'react-redux';
class MobileLogin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            record:false,
            token:''
        }
    }
    onChange(checked){
        this.setState({
            record:checked
        })
    }
    onLogin=(e)=>{
        const {token}=this.state
        this.props.dispatch(fetchAccess(token))
       
    }
    render(){
        let self=this
        let {succeed} =this.props
        return(
            <div>
                <MobileHeader title="个人中心"/>
                {!succeed&&
                <div className="login" >
                    <Input placeholder="请输入Access Token" onChange={(e)=>{
                        this.setState({
                            token:e.target.value
                        })

                    }}/>
                    <div className="record">
                        <span>记住登录信息</span>
                        {/* <Switch defaultChecked onChange={(e)=>{this.onChange.bind(this,e)}}/> */}
                        <Switch/>
                    </div>
                    <Button type="primary" onClick={this.onLogin}>登录</Button>

                </div>
                }
                {succeed&&
                    <div className="userInfo">
                        <h1>登录成功</h1>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps=state=>{
    const {login,user}=state;
    console.log('111',state,user)
    const {failedMessage,succeed,loginName,loginId,accessToken} = login;
    const {avatar_url,score,recent_replies}=user['user']
    console.log(avatar_url)
    return {failedMessage,succeed,loginName,loginId,accessToken}
}
export default connect(mapStateToProps)(MobileLogin)