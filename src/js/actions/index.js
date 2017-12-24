export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_ARTICLE_LIST ='REQUEST_ARTICLE_LIST'
export const RECEIVE_ARTICLE_LIST="RECEIVE_ARTICLE_LIST"
export const REQUEST_ARTICLE ='REQUEST_ARTICLE'
export const RECEIVE_ARTICLE="RECEIVE_ARTICLE"
export const SET_TAB="SET_TAB"
export const RECEIVE_USER="RECEIVE_USER"
export const selectSubreddit = subreddit => ({type: SELECT_SUBREDDIT, subreddit})

export const invalidateSubreddit = subreddit => ({type: INVALIDATE_SUBREDDIT, subreddit})

export const request_article_list = subreddit => ({type: REQUEST_ARTICLE_LIST, subreddit})

export const receive_article_list = (subreddit, json) => ({
    type: RECEIVE_ARTICLE_LIST,
    posts: json,
    receivedAt: Date.now()
})
export const receive_user=(json)=>({
    type:RECEIVE_USER,
    user:json,
    receivedAt:Date.now()
})
export const receive_article=(json)=>({
    type: RECEIVE_ARTICLE,
    posts:json,
    receivedAt:Date.now()
})
export const setTab=(tab='all')=>{
    console.log('tab',tab)
    return{
        type:SET_TAB,
        tab:tab
    }
}

function getArticleList(subreddit,page=1,limit=10,mdrender=false)  {
    console.log('fetchPosts', `https://cnodejs.org/api/v1/topics?tab=${subreddit}`);
    // dispatch(requestPosts(subreddit))
    return dispatch =>{
        dispatch(request_article_list(subreddit))
        return fetch(`https://cnodejs.org/api/v1/topics?tab=${subreddit}&page=${page}&limit=${limit}&mdrender=${mdrender}`)
            .then(response => response.json())
            .then(json => {
                console.log('json',json)
                dispatch(receive_article_list(subreddit, json['data']))
                console.log('ll', json['data'])
            })
    }
}
export const get_user=(userId)=>dispatch=>{
    fetch(`https://cnodejs.org/api/v1/user/${userId}`).then((response)=>response.json()).then((json)=>{
        dispatch(receive_user(json['data']))
    })
}
export const get_article=(topicId,mdrender=true)=>dispatch=>{
    return fetch(`https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${mdrender}`)
    .then(response=>response.json())
    .then(json=>{
        console.log(json)
        dispatch(receive_article(json['data']))
    })
}

// export const getArticlePost=(topicId,mdrender=true)=>dispatch=>{
//     return fetch(`https://cnodejs.org/api/v1/topic/${topicId}?mdrender=${mdrender}`)
//     .then(response=>response.json())
//     .then(json=>{
//         console.log(json)
//         dispatch(receiveTopic(json['data']))
//     })
// }

const shouldFetchPosts = (state, subreddit) => {
    const posts = state.article_list['posts']
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

export function fetchPostsIfNeeded(subreddit,page=1,limit=10) {
    return (dispatch, getState) => {
        console.log('1122')
      if (shouldFetchPosts(getState(), subreddit)) {
          console.log('2233')
        return dispatch(getArticleList(subreddit,page,limit))
      }
    }
  }
