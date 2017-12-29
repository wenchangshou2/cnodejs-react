export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_ARTICLE_LIST ='REQUEST_ARTICLE_LIST';
export const RECEIVE_ARTICLE_LIST='RECEIVE_ARTICLE_LIST';
export const REQUEST_ARTICLE ='REQUEST_ARTICLE';
export const RECEIVE_ARTICLE='RECEIVE_ARTICLE';
export const SET_TAB='SET_TAB';
export const RECEIVE_USER='RECEIVE_USER';
export const REQUEST_USER='REQUEST_USER';
export const RECEIVE_USER_TOPIC_COLLECT='RECEIVE_USER_TOPIC_COLLECT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const selectSubreddit = subreddit => ({type: SELECT_SUBREDDIT, subreddit})

export const invalidateSubreddit = subreddit => ({type: INVALIDATE_SUBREDDIT, subreddit})

export const request_article_list = subreddit => ({type: REQUEST_ARTICLE_LIST, subreddit})

export const receive_article_list = (subreddit, json) => ({
    type: RECEIVE_ARTICLE_LIST,
    posts: json,
    receivedAt: Date.now()
})
const request_user=loginname=>({
    type:REQUEST_USER,
    loginname
})
export const receive_user=(json)=>({
    type:RECEIVE_USER,
    user:json,
    receivedAt:Date.now()
})
export const receive_user_topic_collect=(json)=>({
    type:RECEIVE_USER_TOPIC_COLLECT,
    user_topic_collect:json,
    receivedAt:Date.now()
})
export const receive_article=(json)=>({
    type: RECEIVE_ARTICLE,
    posts:json,
    receivedAt:Date.now()
})
export const setTab=(tab='all')=>{
    return{
        type:SET_TAB,
        tab:tab
    }
}

function getArticleList(subreddit,page=1,limit=10,mdrender=false)  {
    // dispatch(requestPosts(subreddit))
    return dispatch =>{
        dispatch(request_article_list(subreddit))
        return fetch(`https://cnodejs.org/api/v1/topics?tab=${subreddit}&page=${page}&limit=${limit}&mdrender=${mdrender}`)
            .then(response => response.json())
            .then(json => {
                dispatch(receive_article_list(subreddit, json['data']))
            })
    }
}
export const getUser=(userId)=>dispatch=>{
    dispatch(request_user(userId))
    fetch(`https://cnodejs.org/api/v1/user/${userId}`).then((response)=>response.json()).then((json)=>{
        dispatch(receive_user(json['data']))
    })
}
export const getUser_topic_collect=(userId)=>dispatch=>{
    fetch(`https://cnodejs.org/api/v1/topic_collect/${userId}`)
    .then((response) => response.json())
    .then((json) => {
        dispatch(receive_user_topic_collect(json['data']))
    })
}

export const get_article = (topicId, mdrender = true) => (dispatch) => {
  return fetch(`https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${mdrender}`)
    .then(response => response.json())
    .then(json => {
      dispatch(receive_article(json['data']));
    });
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.articleList['posts'];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export function fetchPostsIfNeeded(subreddit, page = 1, limit = 10) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(getArticleList(subreddit, page, limit));
    }
  };
}

export const fetchAccess = token => (dispatch) => {
  const params = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `accesstoken=${token}`
  };
  fetch(`https://cnodejs.org/api/v1/accesstoken`, params)
    .then(response => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(loginSuccess(response.loginname, response.id, token));
      } else {
        dispatch(loginFailed(response.error_msg));
      }
    });
};
/**
 * 获取已读和未读消息
 * @param {any} accessToken tokken
 * @returns 返回dispatch
 */
const fetchMessage = (accessToken) => {
  return (dispatch) => {
    fetch(`https://cnodejs.org/api/v1/messages`)
      .then(response => response.json())
      .then((json) => {
        dispatch({
          type: FETCH_MESSAGE,
          hasReadMessage: json.data.has_read_messages,
          hasNotReadMessage: json.data.hasnot_read_messages,
        });
      });
  };
};
const loginSuccess = (loginName, loginId, accessToken) => ({
  type: LOGIN_SUCCESS,
  loginName,
  loginId,
  accessToken,
});
const loginFailed = failedMessage => ({
  type: LOGIN_FAILED,
  failedMessage,
});
export const logout = () => ({
  type: LOGOUT,
});
