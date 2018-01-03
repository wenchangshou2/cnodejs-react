import { SET_TAB } from '../actions';
const tab = (state = {
    tab: 'all',
}, action) => {
    // const menu = state.tab;
    switch (action.type) {
        case SET_TAB:
            return action.tab ;
        default:
            return state;
    }
};
export default tab;