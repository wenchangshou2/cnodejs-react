import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/button/style';
import PCHeader from './components/PCHeader';
import PCHome from './components/PCHome';
import PCfooter from './components/PCFooter';
import PCStart from './components/PCStart';
import PCTopics from './components/PCTopics';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
// import reducer from './reducers'
import reducer from './reducers';
import {BackTop} from 'antd';

const middleware=[thunk]
// const store = createStore(reducer)
const store = createStore(reducer,applyMiddleware(...middleware));
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PCApi from './components/PCApi';
import PCUser from './components/PCUser';
import { applyMiddleware } from '../../../../../../Users/wcs/Library/Caches/typescript/2.6/node_modules/redux';
export default class Root extends React.Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <div>
                        <Router>
                            <div>
                                <PCHeader/>
                                <Route exact path="/" component={PCHome}/>
                                <Route path="/getstart" component={PCStart}/>
                                <Route path="/api" component={PCApi}/>
                                <Route path="/topic/:id" component={PCTopics}/>
                                <Route path="/user/:id" component={PCUser}/>
                                <PCfooter/>
                                <BackTop/>
                            </div>
                        </Router>
                    </div>
                </Provider>
            </div>
        )
    }
}
ReactDOM.render(
    <Root/>, document.getElementById('mainContainer'));