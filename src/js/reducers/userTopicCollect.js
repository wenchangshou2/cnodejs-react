import {RECEIVE_USER_TOPIC_COLLECT} from '../actions';
const userTopicCollect = (state = [
], action) => {
  switch (action.type) {
    case RECEIVE_USER_TOPIC_COLLECT:
    return [...action.user_topic_collect]
    default:
      return state;
  }
};
export default userTopicCollect;