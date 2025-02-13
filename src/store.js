import { configureStore } from '@reduxjs/toolkit';
import tipsReducer from './pages/HomePage/homePageSlice';
import profileReducer from './pages/Profile/profileSlice';

export default configureStore({
  reducer: {
    homePage: tipsReducer,
    profile: profileReducer,
  },
});
