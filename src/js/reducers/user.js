import {REQUEST_USER,RECEIVE_USER} from '../actions';
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
export default user;