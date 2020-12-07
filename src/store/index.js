import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

let reducers = combineReducers({});

const store = () => {
  return createStore( reducers, composeWithDevTools(applyMiddleware()) )
}

export default store;

