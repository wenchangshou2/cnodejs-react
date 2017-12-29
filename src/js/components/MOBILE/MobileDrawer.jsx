import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-motion-drawer';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import PropTypes from 'prop-types';
import transformDate from '../../../utils/transformDate';
import { logout } from '../../actions';

const style = {
  background: '#F9F9F9',
  boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px',
};

class MobileDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    window.localStorage.removeItem('masterInfo');
    this.props.dispatch(logout());

  }
  render() {
    const { login, user } = this.props;
    const { succeed } = login;
    const drawerProps = {
      overlayColor: 'rgba(255,255,255,0.6)',
      drawerStyle: style,
    };
    return (
      <div>
        <Drawer
          {...drawerProps}
          width={this.state.width}
          fadeOut
          open={this.props.openLeft}
          onChange={openState => this.setState({ openLeft: openState })}
          className="myDrawer"
        >
          {succeed &&
            <div>
              <div className="loginSuccess">
                <Avatar icon="user" className="icon" size="large" src={user.avatar_url} />
                <Link to={`/user/${user.loginname}`}>
                  <h3>{user.loginname}</h3>
                </Link>
                <p>积分：{user.score}</p>
                <p>注册于:{transformDate(user.create_at)}</p>
                <Button type="primary" onClick={this.logOut}>注销登录</Button>
              </div>
            </div>
          }

          {!succeed &&
            <div className="up">
              <Link to="/login">
                <Avatar icon="user" className="icon" size="large" />
              </Link>
              <h3>通过头像登录</h3>
            </div>
          }
        </Drawer>
      </div>
    );
  }
}
MobileDrawer.propTypes = {
  openLeft: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => {
  const {
    user, login,
  } = state;
  return {
    user, login,
  };
};
export default connect(mapStateToProps)(MobileDrawer);

