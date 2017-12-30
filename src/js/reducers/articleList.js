import { REQUEST_ARTICLE_LIST, RECEIVE_ARTICLE_LIST } from '../actions';
const articles = (state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action) => {
    switch (action.type) {
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
const articleList = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case REQUEST_ARTICLE_LIST:
        case RECEIVE_ARTICLE_LIST:
            return Object.assign({}, state, articles(state, action))
        default:
            return state
    }

}
export default articleList;
