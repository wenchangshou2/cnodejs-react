import React from 'react';
import MediaQuery from 'react-responsive';
import PCHeader from './PCHeader';
import PCHome from './PCHome';
import PCfooter from './PCFooter';
import PCStart from './PCStart';
import PCTopics from './PCTopics';
import PCSignin from './PCSignin';
import PCApi from './PCApi';
import PCUser from './PCUser';
import MobileHome from './MobileHome';
import MobileTopic from './MobileTopic';
import MobileUser from './MobileUser';
import MobileLogin from './MobileLogin';
import { BackTop } from 'antd';
import {connect} from 'react-redux';
import {fetchAccess,get_user} from '../actions'



import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends React.Component{
    componentWillMount() {
        const { dispatch } = this.props;

        const LoadingAction = (accesToken, loginName) => {
            console.log(dispatch)
            dispatch(fetchAccess(accesToken))
            dispatch(get_user(loginName))
        }
        if (window.localStorage.getItem('masterInfo')) {
            let masterInfo = window.localStorage.getItem('masterInfo')
            masterInfo = JSON.parse(masterInfo)
            const accessToken = masterInfo.accessToken;
            const loginName = masterInfo.loginName;
            LoadingAction(accessToken, loginName)
        } else {
            const accessToken = '6f91a397-1fe7-445f-bf29-30b5a9ab674e'
            const loginName = 'wenchangshou2'
            LoadingAction(accessToken, loginName)
        }
    }
    render(){
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

}
const mapStateToProps=state=>{
    const {
        user,login
    }=state
    return {
        user,login
    }
}
export default connect(mapStateToProps)(App)