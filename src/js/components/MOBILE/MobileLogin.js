import React from 'react';
import MobileHeader from './MobileHeader'
import {Input,Switch,Button} from 'antd'
import { fetchAccess, getUser, get_user } from '../../actions/index';
import {connect} from 'react-redux';
class MobileLogin extends React.Component {
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
    componentWillReceiveProps(newProps){
        let {succeed,loginName,accessToken,dispatch,user} = newProps;
        console.log('new',newProps,user,user.loginname,loginName)
        if(succeed&&!user.isFetching&&user.loginname!==loginName){
            console.log('yyyyyyyyyy',this.state.record,window.localStorage.getItem('masterInfo'))
            if( !window.localStorage.getItem('masterInfo')){

                console.log('aaaaaaaaaaa')
                accessToken=accessToken.trim();
                loginName=loginName.trim();
                let masterInfo={accessToken,loginName}
                masterInfo=JSON.stringify(masterInfo)
                console.log('lll',masterInfo)
                window.localStorage.setItem('masterInfo',masterInfo)
            }
            dispatch(get_user(loginName))
        }
    }
    render(){
        let self=this
        let {dispatch,user,succeed,failedMessage,loginName,loginId,accessToken} =this.props
        const masterInfo = window.localStorage.getItem('masterInfo') ? true : false
        if(loginName!==user.loginname&&window.sessionStorage.masterProfile){
            profile=JSON.parse(window.sessionStorage.masterProfile)
            console.log('profile',profile)
        }

        console.log('masterInfo',masterInfo,window.localStorage)


        return(
            <div>
                <MobileHeader title="个人中心"/>
                {!masterInfo&&
                <div className="login" >
                    <Input placeholder="请输入Access Token" onChange={(e)=>{
                        // this.setState({
                        //     token:e.target.value
                        // })

                    }}/>
                    <div className="record">
                        <span>记住登录信息</span>
                        {/* <Switch defaultChecked onChange={(e)=>{this.onChange.bind(this,e)}}/> */}
                        <Switch/>
                    </div>
                    <Button type="primary" onClick={this.onLogin}>登录</Button>

                </div>
                }
                {masterInfo&&
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
    const {failedMessage,succeed,loginName,loginId,accessToken} = login;
    // const {avatar_url,score,recent_replies}=user['user']
    return {failedMessage,succeed,loginName,loginId,accessToken,user}
}
export default connect(mapStateToProps)(MobileLogin)