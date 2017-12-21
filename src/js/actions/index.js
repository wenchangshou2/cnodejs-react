export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const RECEIVE_TOPIC_POST="RECEIVE_TOPIC_POST"
export const selectSubreddit = subreddit => ({type: SELECT_SUBREDDIT, subreddit})

export const invalidateSubreddit = subreddit => ({type: INVALIDATE_SUBREDDIT, subreddit})

export const requestPosts = subreddit => ({type: REQUEST_POSTS, subreddit})

export const receivePosts = (subreddit, json) => ({
    type: RECEIVE_POSTS,
    posts: json,
    receivedAt: Date.now()
})
export const receiveTopic=(json)=>({
    type:RECEIVE_TOPIC_POST,
    posts:json,
    receivedAt:Date.now()
})

function fetchPosts(subreddit,page=1,limit=30,mdrender=false)  {
    console.log('fetchPosts', `https://cnodejs.org/api/v1/topics?tab=${subreddit}`);
    // dispatch(requestPosts(subreddit))
    return dispatch =>{
        console.log('ff11111')
        dispatch(requestPosts(subreddit))
        console.log('22222222222')
        return fetch(`https://cnodejs.org/api/v1/topics?tab=${subreddit}&page=${page}&limit=${limit}&mdrender=${mdrender}`)
            .then(response => response.json())
            .then(json => {
                console.log('json',json)
                dispatch(receivePosts(subreddit, json['data']))
                console.log('ll', json['data'])
            })
    }
}
export const getArticlePost=(topicId,mdrender=true)=>dispatch=>{
    return fetch(`https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${mdrender}`)
    .then(response=>response.json())
    .then(json=>{
        console.log(json)
        dispatch(receiveTopic(json['data']))
    })
}

const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit['post']
    if (!posts) {
        console.log('111111111')
        return true
    }
    if (posts.isFetching) {
        console.log('222222')
        return false
    }
    return posts.didInvalidate
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        console.log('1122')
      if (shouldFetchPosts(getState(), subreddit)) {
          console.log('2233')
        return dispatch(fetchPosts(subreddit))
      }
    }
  }
