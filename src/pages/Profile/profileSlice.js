import { createSlice } from '@reduxjs/toolkit';
import { Tabs } from './constants';

const initialState = {
  userData: null,
  activeTab: Tabs.RECEIVED,
  isLoading: false,
  tipsLoading: false,
  tipsReceived: [],
  tipsSent: [],
};

const homePageSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setTipsReceived: (state, action) => {
      state.tipsReceived = action.payload;
    },
    setTipsSent: (state, action) => {
      state.tipsSent = action.payload;
    },
    setTipsLoading: (state, action) => {
      state.tipsLoading = action.payload;
    },
  },
});

export const {
  setUserData,
  setIsLoading,
  setActiveTab,
  setTipsReceived,
  setTipsSent,
  setTipsLoading,
} = homePageSlice.actions;

export default homePageSlice.reducer;
