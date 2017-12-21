import {
  combineReducers
} from 'redux'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_TOPIC_POST

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

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  console.log('posts', action)
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_TOPIC_POST:
      return {
        ...state,
        items: action.posts
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  console.log('postsBySubreddit', state)
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      if (action['posts'] == undefined) {
        return {}
      }
      return {
        ...state,
        ['post']: action['posts']
      }
    default:
      return state
  }
}
const postTopic=(state={},action)=>{
  console.log('postTopic',action)
  switch(action.type){
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case RECEIVE_TOPIC_POST:
      return Object.assign({},state,{
        'topic':posts(action['posts'])
      })
    default:
      return{
        ...state,
        ['topic']:action['posts']
      }
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  postTopic
})

export default rootReducer