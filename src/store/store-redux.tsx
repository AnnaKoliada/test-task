import { combineReducers, createStore } from 'redux';
import showItemsReducer from './item-redux'
import reducer from './reducer';

const reducers = combineReducers({
  items: showItemsReducer,
  card: reducer,
});
const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;

export default store;
