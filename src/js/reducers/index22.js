import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  RECEIVE_ARTICLE_LIST,
  REQUEST_ARTICLE_LIST,
  REQUEST_ARTICLE,
  RECEIVE_ARTICLE,
  SET_TAB,
  RECEIVE_USER,
  REQUEST_USER,
  RECEIVE_USER_TOPIC_COLLECT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from '../actions';



const postTopic = (state = {
  isFetching: false,
  didInvalidate: false,
  topic: {
    author: {},
    replies: [],
  },
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case RECEIVE_TOPIC_POST:
      return Object.assign({}, state, post(state, action))
    default:
      return state
  }
}

const article = (state = {
  isFetching: false,
  topic: {
    author: {
      avatar_url: ''
    },
    replies: []
  }
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_ARTICLE:
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, post(state, action))
    default:
      return state

  }
}
const user = (state = {
  isFetching: false, collectedTopics: [], recent_replies: [],
}, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, isFetching: true }
    case RECEIVE_USER:
      return Object.assign({}, state,
        Object.assign({}, state, {
          ...action.user,
          lastUpdated: action.receivedAt, isFetching: false
        }))
    default:
      return state;
  }
};
const tab = (state = {
  tab: 'all',
}, action) => {
  // const menu = state.tab;
  switch (action.type) {
    case SET_TAB:
      return action.tab ;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  // postsBySubreddit,
  articleList,
  article,
  tab,
  user,
  user_topic_collect,
});

export default rootReducer;