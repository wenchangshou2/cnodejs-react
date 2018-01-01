import React from 'react';
import MobileHeader from './MobileHeader.jsx'
import { Input, Switch, Button } from 'antd'
import { fetchAccess, getUser } from '../../actions/index';
import { connect } from 'react-redux';
class MobileLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      token: '',
    };
  }
  onChange(checked) {
    this.setState({
      record: checked
    })
  }
  onLogin = (e) => {
    const { token } = this.state;
    this.props.dispatch(fetchAccess(token));
  }
  componentWillReceiveProps(newProps) {
    let { succeed, loginName, accessToken, dispatch, user } = newProps;
    if (succeed && !user.isFetching && user.loginname !== loginName) {
      if (!window.localStorage.getItem('masterInfo')) {
        accessToken = accessToken.trim();
        loginName = loginName.trim();
        let masterInfo = { accessToken, loginName };
        masterInfo = JSON.stringify(masterInfo);
        window.localStorage.setItem('masterInfo', masterInfo);
      }
      dispatch(getUser(loginName));
    }
  }
  render() {
    let self = this
    let { dispatch, user, succeed, failedMessage, loginName, loginId, accessToken } = this.props
    const masterInfo = window.localStorage.getItem('masterInfo') ? true : false
    if (loginName !== user.loginname && window.sessionStorage.masterProfile) {
      profile = JSON.parse(window.sessionStorage.masterProfile)
    }



    return (
      <div>
        <MobileHeader title="个人中心" />
        {!masterInfo &&
          <div className="login" >
            <Input placeholder="请输入Access Token" onChange={(e) => {
              this.setState({
                token: e.target.value
              })

            }} />
            <div className="record">
              <span>记住登录信息</span>
              {/* <Switch defaultChecked onChange={(e)=>{this.onChange.bind(this,e)}}/> */}
              <Switch />
            </div>
            <Button type="primary" onClick={this.onLogin.bind(this)}>登录</Button>

          </div>
        }
        {masterInfo &&
          <div className="userInfo">
            <h1>登录成功</h1>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { login, user } = state;
  const { failedMessage, succeed, loginName, loginId, accessToken } = login;
  // const {avatar_url,score,recent_replies}=user['user']
  return { failedMessage, succeed, loginName, loginId, accessToken, user }
}
export default connect(mapStateToProps)(MobileLogin)