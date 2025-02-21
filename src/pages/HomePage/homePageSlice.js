import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ENDPOINT } from '../../config';

const initialState = {
  comment: '',
  step: 1,
  tweetData: null,
  isTweetLoaded: false,
  isLoading: false,
  invoiceData: null,

  tipData: null,

  // Step 1:
  tweetURL: '',
  isInvalid: false,
  isSelfTipping: false,

  // Step 2:
  isNextDisabled: true,
  isChecked: false,

  // Step 3:
  satValue: '',

  // Step 4:
  copied: false,

  // Leaderboard
  activeTab: 'sent',
  leaderboardReceived: [],
  leaderboardSent: [],
  leaderboardLoading: false,
  leaderboardError: null,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setTweetData: (state, action) => {
      state.tweetData = { ...state.tweetData, ...action.payload };
    },
    setIsTweetLoaded: (state, action) => {
      state.isTweetLoaded = action.payload;
    },
    setTweetURL: (state, action) => {
      state.tweetURL = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsInvalid: (state, action) => {
      state.isInvalid = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setIsNextDisabled: (state, action) => {
      state.isNextDisabled = action.payload;
    },
    setIsChecked: (state, action) => {
      state.isChecked = action.payload;
    },
    setSatValue: (state, action) => {
      state.satValue = action.payload;
    },
    setCopied: (state, action) => {
      state.copied = action.payload;
    },
    resetToInitialState: () => {
      return initialState;
    },
    setSelfTipping: (state, action) => {
      state.isSelfTipping = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardReceived.pending, (state) => {
        state.leaderboardLoading = true;
        state.leaderboardError = null;
      })
      .addCase(fetchLeaderboardReceived.fulfilled, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardReceived = action.payload;
      })
      .addCase(fetchLeaderboardReceived.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.payload;
      })
      .addCase(fetchLeaderboardSent.pending, (state) => {
        state.leaderboardLoading = true;
        state.leaderboardError = null;
      })
      .addCase(fetchLeaderboardSent.fulfilled, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardSent = action.payload;
      })
      .addCase(fetchLeaderboardSent.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.payload;
      })
      .addCase(fetchTip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tipData = action.payload;
      })
      .addCase(fetchTip.rejected, (state) => {
        state.isLoading = false;
        // state.isInvalid = true;
      });
  },
});

// Create async thunk for fetching leaderboard data
export const fetchTip = createAsyncThunk(
  'homePage/fetchTip',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/tips/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create async thunk for fetching leaderboard data
export const fetchLeaderboardReceived = createAsyncThunk(
  'homePage/fetchLeaderboardReceived',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/tips/leaderboard_received`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLeaderboardSent = createAsyncThunk(
  'homePage/fetchLeaderboardSent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/tips/leaderboard_sent`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const {
  setStep,
  setTweetData,
  setIsTweetLoaded,
  setTweetURL,
  setIsLoading,
  setIsInvalid,
  setInvoiceData,
  setComment,
  setIsNextDisabled,
  setIsChecked,
  setSatValue,
  setCopied,
  resetToInitialState,
  setSelfTipping,
  setActiveTab,
} = homePageSlice.actions;

export default homePageSlice.reducer;
