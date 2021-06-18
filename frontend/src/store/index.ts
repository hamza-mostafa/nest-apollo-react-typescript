import { ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from "./reducers";
import {createStore, combineReducers, applyMiddleware, Reducer} from 'redux';

import * as logger from 'redux-logger';
import thunk from 'redux-thunk';


const rootReducer: Reducer<any, any> = combineReducers({
  user: userReducer
});

const defaultState = {
  user: {
    id: 0,
    name: '',
    email: "fake@email.com",
    token: ''
  }
}


const store = createStore(rootReducer, defaultState, applyMiddleware((logger as any).createLogger(), thunk));

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
