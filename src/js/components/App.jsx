import React from 'react';
import { connect } from 'react-redux';
import { BackTop } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import PCHeader from './PC/PCHeader';
import PCHome from './PC/PCHome';
import PCfooter from './PC/PCFooter';
import PCStart from './PC/PCStart';
import PCTopics from './PC/PCTopics.jsx';
import PCSignin from './PC/PCSignin';
import PCApi from './PC/PCApi';
import PCUser from './PC/PCUser.jsx';
import MobileHome from './MOBILE/MobileHome';
import MobileTopic from './MOBILE/MobileTopic';
import MobileUser from './MOBILE/MobileUser';
import MobileLogin from './MOBILE/MobileLogin';
import { fetchAccess, getUser } from '../actions';

class App extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const LoadingAction = (accesToken, loginName) => {
      dispatch(fetchAccess(accesToken));
      dispatch(getUser(loginName));
    };
    if (window.localStorage.getItem('masterInfo')) {
      let masterInfo = window.localStorage.getItem('masterInfo');
      masterInfo = JSON.parse(masterInfo);
      const accessToken = masterInfo.accessToken;
      const loginName = masterInfo.loginName;
      LoadingAction(accessToken, loginName);
    } else {
      const accessToken = '6f91a397-1fe7-445f-bf29-30b5a9ab674e'
      const loginName = 'wenchangshou2'
      LoadingAction(accessToken, loginName)
    }
  }
  render() {
    return(
        <div>
                <MediaQuery query="(min-device-width: 1224px)">
                    <Router>
                        <div>
                            <PCHeader />
                            <Route exact path="/" component={PCHome} />
                            <Route path="/getstart" component={PCStart} />
                            <Route path="/api" component={PCApi} />
                            <Route path="/topic/:id" component={PCTopics} />
                            <Route path="/user/:id" component={PCUser} />
                            <Route path="/signin" component={PCSignin} />
                            <PCfooter />
                            <BackTop />
                        </div>
                    </Router>
                </MediaQuery>

                <MediaQuery query="(max-device-width:1224px)">
                    <Router>
                        <div>
                            <Route exact path="/" component={MobileHome} />
                            <Route path="/topic/:id" component={MobileTopic} />
                            <Route path="/user/:id" component={MobileUser} />
                            <Route path="/login" component={MobileLogin} />
                        </div>
                    </Router>
                </MediaQuery>
            </div>

        )
    }

};
const mapStateToProps = (state) => {
  const {
    user,
    login,
  } = state;
  return {
    user,
    login,
  };
};
export default connect(mapStateToProps)(App);
