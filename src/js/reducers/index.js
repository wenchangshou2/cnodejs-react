import {
  combineReducers
} from 'redux'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  RECEIVE_ARTICLE_LIST,
  REQUEST_ARTICLE_LIST,
  REQUEST_ARTICLE,
  RECEIVE_ARTICLE,
  SET_TAB,
  RECEIVE_USER,
  RECEIVE_USER_TOPIC_COLLECT
} from '../actions'

const selectedSubreddit = (state = 'job', action) => {
  console.log('selectedSubreddit', action, action.type, state)
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return 'post'
      return action.subreddit
    default:
      return state
  }
}

const articles = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  console.log('posts2222222', action)
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_ARTICLE_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, {
        isFetching:false,
        didiInvalidate:false,
        items:action.posts,
        lastUpdated:action.receivedAt
      })
    // case RECEIVE_TOPIC_POST:
    //   return Object.assign({},state,{
    //     isFetching:false,
    //     didiInvalidate:false,
    //     topic:action.posts,
    //     lastUpdated:action.receivedAt
    //   })
    default:
      return state
  }
}
const post = (state = {
  isFetching: false,
  didInvalidate: false,
  topic: {}
}, action) => {
  console.log('posts2222222', action)
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_ARTICLE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, {
        isFetching:false,
        didiInvalidate:false,
        topic:action.posts,
        lastUpdated:action.receivedAt
      })
    // case RECEIVE_TOPIC_POST:
    //   return Object.assign({},state,{
    //     isFetching:false,
    //     didiInvalidate:false,
    //     topic:action.posts,
    //     lastUpdated:action.receivedAt
    //   })
    default:
      return state
  }
}

const postTopic=(state={
  isFetching:false,
  didInvalidate:false,
  topic:{
    author:{},
    replies:[],
  }
},action)=>{
  console.log('postTopic',state,action)
  switch(action.type){
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case RECEIVE_TOPIC_POST:
        return Object.assign({},state,post(state,action))
    default:
      return state
  }
}
const article_list=(state={
  isFetching:false,
  didInvalidate:false,
  items:[]
},action)=>{
  switch(action.type){
    case INVALIDATE_SUBREDDIT:
    case REQUEST_ARTICLE_LIST:
    case RECEIVE_ARTICLE_LIST:
        return Object.assign({},state,articles(state,action))
    default:
      return state
  }

}
const article=(state={
  isFetching:false,
  topic:{
    author:{
      avatar_url:''
    },
    replies:[]
  }
},action)=>{
  switch(action.type){
    case INVALIDATE_SUBREDDIT:
    case REQUEST_ARTICLE:
    case RECEIVE_ARTICLE:
      return Object.assign({},state,post(state,action))
    default:
      return state

  }
}
const user=(state={
  user:{}
},action)=>{
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state,
        Object.assign({}, state, {
          user: action.user,
          lastUpdated: action.receivedAt
        }))
      default:
        return state;
  }
}
const user_topic_collect=(state={
  user_topic_collect:[

  ],
},action)=>{
  switch (action.type) {
    case RECEIVE_USER_TOPIC_COLLECT:
      return Object.assign({}, state,
        Object.assign({}, state, {
          user_topic_collect: action.user_topic_collect,
          lastUpdated: action.receivedAt
        }))
      default:
        return state;
  }
}
const tab=(state={
  tab:'all'
},action)=>{
  console.log('22',state,action)
  const menu=state.tab
  switch(action.type){
    case SET_TAB:
      console.log('settab',menu)
      return {tab:action.tab};
    default:
      return state;

  }
}
const rootReducer = combineReducers({
  // postsBySubreddit,
  article_list,
  article,
  tab,user,user_topic_collect
})

export default rootReducer