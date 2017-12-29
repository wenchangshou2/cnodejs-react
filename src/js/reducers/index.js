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


const articles = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true,
      }
    case REQUEST_ARTICLE_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didiInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    // case RECEIVE_TOPIC_POST:
    //   return Object.assign({},state,{
    //     isFetching:false,
    //     didiInvalidate:false,
    //     topic:action.posts,
    //     lastUpdated:action.receivedAt
    //   })
    default:
      return state;
  }
};
const post = (state = {
  isFetching: false,
  didInvalidate: false,
  topic: {},
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_ARTICLE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, {
        isFetching: false,
        didiInvalidate: false,
        topic: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

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
const articleList = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_ARTICLE_LIST:
    case RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, articles(state, action))
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
const user_topic_collect = (state = {
  user_topic_collect: [

  ],
}, action) => {
  switch (action.type) {
    case RECEIVE_USER_TOPIC_COLLECT:
      return Object.assign({}, state,
        Object.assign({}, state, {
          user_topic_collect: action.user_topic_collect,
          lastUpdated: action.receivedAt
        }));
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
      return { tab: action.tab };
    default:
      return state;
  }
};
const login = (state = { success: false }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        succeed: true,
        loginName: action.loginName,
        loginId: action.loginId,
        accessToken: action.accessToken,
      };
    case LOGIN_FAILED:
      return { ...state, succeed: false, failedMessage: action.failedMessage };
    case LOGOUT:
      return { succeed: false };
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
  login,
});

export default rootReducer;