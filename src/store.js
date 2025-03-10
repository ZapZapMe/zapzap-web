import { configureStore } from '@reduxjs/toolkit';
import tipsReducer from './pages/HomePage/homePageSlice';
import profileReducer from './pages/Profile/profileSlice';
import authReducer from './lib/auth/authSlice';
import faqReducer from './pages/FAQ/faqSlice';
import settingsReducer from './pages/Settings/settingsSlice';

export default configureStore({
  reducer: {
    homePage: tipsReducer,
    profile: profileReducer,
    auth: authReducer,
    faq: faqReducer,
    settings: settingsReducer,
  },
});
