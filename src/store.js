import { createStore, combineReducers } from 'redux';
import tipsReducer from './pages/HomePage/homePageSlice';

// Combine all reducers
const rootReducer = combineReducers({
  homePage: tipsReducer,
});

// Create the Redux store with middleware
const store = createStore(rootReducer);

export default store;
