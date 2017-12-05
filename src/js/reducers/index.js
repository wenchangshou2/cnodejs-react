import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({todos, visibilityFilter})

const defaultState = 0;
const reducer = (state = defaultState, action) => {
  console.log('ffffff')
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
}

// export default todoApp
export default reducer;