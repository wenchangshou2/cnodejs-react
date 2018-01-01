import { INVALIDATE_SUBREDDIT, REQUEST_ARTICLE, RECEIVE_ARTICLE,FETCH_COMMENT } from '../actions';

const post = (state = {
    isFetching: false,
    didInvalidate: false,
    topic: {},
    currentTopicId: ''
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
                currentTopicId:action.posts.id
            });
        case FETCH_COMMENT:
            return { ...state, isCommented: action.success }
        default:
            return state;
    }
};
const article = (state = {
    isFetching: false,
    topic: {
        author: {
            avatar_url: '',
            loginname: '',
        },
        replies: []
    },
    currentTopicId: '',
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
export default article;