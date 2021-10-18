import { combineReducers, createStore } from 'redux';
import showItemsReducer from './item-redux'

const reducers = combineReducers({
  items: showItemsReducer,
});
const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;

export default store;
