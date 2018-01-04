import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'github-markdown-css';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import reducer from './reducers'
import reducer from './reducers';
import '../css/mobile.less';
import App from './components/App.jsx';

const middleware = [thunk, logger];
const store = createStore(reducer, applyMiddleware(...middleware));
export default class Root extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <Provider store={store}>
          <div>
            <App />
          </div>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('mainContainer'));
