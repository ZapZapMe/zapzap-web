import { configureStore } from '@reduxjs/toolkit';
import tipsReducer from './pages/HomePage/homePageSlice';
import profileReducer from './pages/Profile/profileSlice';
import authReducer from './lib/auth/authSlice';

export default configureStore({
  reducer: {
    homePage: tipsReducer,
    profile: profileReducer,
    auth: authReducer,
  },
});
