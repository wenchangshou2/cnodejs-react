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

const fetchPosts = subreddit => dispatch => {
    console.log('fetchPosts', `https://cnodejs.org/api/v1/topics?tab=${subreddit}`);
    // dispatch(requestPosts(subreddit))
    return fetch(`https://cnodejs.org/api/v1/topics?tab=${subreddit}`)
        .then(response => response.json())
        .then(json => {
            dispatch(receivePosts(subreddit, json['data']))
            console.log('ll',json['data'])
        })
}
export const getArticlePost=(topicId,mdrender=false)=>dispatch=>{
    return fetch(`https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${mdrender}`)
    .then(response=>response.json())
    .then(json=>{
        console.log(json)
        dispatch(receiveTopic(json['data']))
    })
}

const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
    console.log('fetchPostsIfNeeded', subreddit)
    // if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
    // }
}
