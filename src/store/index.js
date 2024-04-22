import {  combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer, { username } from './userReducer.js';
import socketReducer from './socketReducer.js';
import gameInfoReducer from './gameInfoReducer.js';
import fakeOpponentSocketReducer from './fakeOpponentSocketReducer'
import soundsReducer, { isMuted } from './soundsReducer';
import statsReducer from './statsReducer';
import categoriesReducer from './categoriesReducer.js';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isMuted', 'username', 'statsReducer'],
}

let reducers = combineReducers({
  userReducer,
  username,
  socketReducer,
  gameInfoReducer,
  fakeOpponentSocketReducer,
  soundsReducer,
  isMuted,
  statsReducer,
  categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;

export const persistor = persistStore(store);

