import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/button/style'; 
import PCHeader from './components/PCHeader';
import PCHome from './components/PCHome';
import PCfooter from './components/PCFooter';
import PCStart from './components/PCStart';
import PCTopic from './components/PCTopic';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
// import reducer from './reducers'
import reducer from './reducers';
// const store = createStore(reducer)
const store = createStore(reducer);
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
import PCApi from './components/PCApi';


export default class Root extends React.Component{
    render(){
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
                    <Route path="/topic/:id" component={PCTopic}/>
                    <PCfooter/>
                </div>
            </Router>
            </div>
            </Provider>
            </div>
        )
    }
}
ReactDOM.render(<Root/>,document.getElementById('mainContainer'));