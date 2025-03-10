import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient, { API_BASE_URL } from '../../lib/utils/axiosClient';

// Async thunk to update wallet address
export const updateWalletAddress = createAsyncThunk(
  'settings/updateWalletAddress',
  async (walletAddress, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`${API_BASE_URL}/users/me`, {
        wallet_address: walletAddress,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    walletAddress: '',
    suggestions: [],
    error: null,
    success: null,
    isEditing: false,
    isLoading: false,
    showSuggestions: false,
  },
  reducers: {
    // Define any synchronous actions here if needed
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setShowSuggestions: (state, action) => {
      state.showSuggestions = action.payload;
    },
    resetSettingsState: (state) => {
      state.walletAddress = '';
      state.suggestions = [];
      state.error = null;
      state.success = null;
      state.isEditing = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateWalletAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateWalletAddress.fulfilled, (state) => {
        state.success = true;
        state.error = null;
        state.isLoading = false;
        state.isEditing = false;
      })
      .addCase(updateWalletAddress.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setIsEditing,
  setWalletAddress,
  setSuggestions,
  setShowSuggestions,
  resetSettingsState,
} = settingsSlice.actions;
export default settingsSlice.reducer;
