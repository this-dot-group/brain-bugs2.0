import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer.js';
import socketReducer from './socketReducer.js';
import gameInfoReducer from './gameInfoReducer.js';
import fakeOpponentSocketReducer from './fakeOpponentSocketReducer'



let reducers = combineReducers({ userReducer, socketReducer, gameInfoReducer, fakeOpponentSocketReducer});

const store = () => {
  return createStore( reducers, composeWithDevTools(applyMiddleware(thunk)) );
};

export default store();

