import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import usernameReducer from './usernameReducer.js';

let reducers = combineReducers({ usernameReducer });

const store = () => {
  return createStore( reducers, composeWithDevTools(applyMiddleware(thunk)) )
}

export default store();

