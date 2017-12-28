import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/button/style';

import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import reducer from './reducers'
import reducer from './reducers';

import  logger from 'redux-logger';
import 'github-markdown-css';
import '../css/mobile.less'
import {connect} from 'react-redux';
import App from './components/App'



const middleware = [thunk,logger];
// const store = createStore(reducer)
const store = createStore(reducer, applyMiddleware(...middleware));
export default class Root extends React.Component {
    componentWillMount(){
        const {dispatch}=this.props;
        // const LoadingAction=(accesToken,loginName)=>{
        //     console.log(dispatch)
        //     dispatch(fetchAccess(accesToken))
        //     dispatch(get_user(loginName))
        // }
        // if(window.localStorage.getItem('masterInfo')){
        //     let masterInfo=window.localStorage.getItem('masterInfo')
        //     masterInfo=JSON.parse(masterInfo)
        //     const accessToken=masterInfo.accessToken;
        //     const loginName=masterInfo.loginName;
        //     LoadingAction(accessToken,loginName)
        // }else{
        //     const accessToken='6f91a397-1fe7-445f-bf29-30b5a9ab674e'
        //     const loginName='wenchangshou2'
        //     LoadingAction(accessToken,loginName)
        // }
    }
    render() {
        return (
            <div>
                <Provider store={store}>
                    <div>
                        <App/>
                    
                    </div>
                </Provider>
            </div>
        )
    }
};

ReactDOM.render(
  <Root />, document.getElementById('mainContainer')
);
