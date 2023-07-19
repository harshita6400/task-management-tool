import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import eventDataSlice from '../reduxSlice/eventDataSlice';

const rootReducer = combineReducers({
  eventDataSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>
