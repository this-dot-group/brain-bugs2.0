import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import usernameReducer from './usernameReducer.js';
import socketReducer from './socketReducer.js';


let reducers = combineReducers({ usernameReducer, socketReducer });

const store = () => {
  return createStore( reducers, composeWithDevTools(applyMiddleware(thunk)) )
}

export default store();

