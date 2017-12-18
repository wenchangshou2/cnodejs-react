import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/button/style';
import PCHeader from './components/PCHeader';
import PCHome from './components/PCHome';
import PCfooter from './components/PCFooter';
import PCStart from './components/PCStart';
import PCTopics from './components/PCTopics';
import PCSignin from './components/PCSignin';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import reducer from './reducers'
import reducer from './reducers';
import { BackTop } from 'antd';
import MediaQuery from 'react-responsive';
import MobileHome from './components/MobileHome';
import MobileTopic from './components/MobileTopic';


const middleware = [thunk];
// const store = createStore(reducer)
const store = createStore(reducer, applyMiddleware(...middleware));
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PCApi from './components/PCApi';
import PCUser from './components/PCUser';
import { applyMiddleware } from 'redux';
export default class Root extends React.Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <div>
                        <MediaQuery query="(min-device-width: 1224px)">
                        <Router>
                            <div>
                                <PCHeader/>
                                <Route exact path="/" component={PCHome}/>
                                <Route path="/getstart" component={PCStart}/>
                                <Route path="/api" component={PCApi}/>
                                <Route path="/topic/:id" component={PCTopics}/>
                                <Route path="/user/:id" component={PCUser}/>
                                <Route path="/signin" component={PCSignin}/>
                                <PCfooter/>
                                <BackTop/>
                            </div>
                        </Router>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width:1224px)">
                            <Router>
                                <div>
                                    <Route exact path="/" component={MobileHome}/>
                                    <Route path="/topic/:id" component={MobileTopic}/>
                                </div>
                            </Router>
                        </MediaQuery>
                    </div>
                </Provider>
            </div>
        )
    }
};

ReactDOM.render(
  <Root />, document.getElementById('mainContainer')
);
