import { combineReducers } from 'redux';
import login from './login';
import articleList from './articleList';
import userTopicCollect from './userTopicCollect';
import user from './user';
import tab from './tab';
import article from './article';

const rootReducer=combineReducers({
    login,
    articleList,
    userTopicCollect,
    user,
    tab,
    article
});
export default rootReducer;
