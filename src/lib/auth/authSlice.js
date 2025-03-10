import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT } from '../../config';

// Async thunk for Twitter login
export const twitterLogin = createAsyncThunk(
  'auth/twitterLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/twitter/login`);
      const data = await response.json();

      if (data.authorization_url) {
        return data.authorization_url;
        // window.location.href = data.authorization_url;
      } else {
        return rejectWithValue(`Error logging in with Twitter ${data}`);
      }
    } catch (error) {
      return rejectWithValue(`Error logging in with Twitter: ${error}`);
    }
  }
);

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }

      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    authorizationUrl: null,
    isLoading: false,
    isMenuOpen: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    setIsMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        localStorage.removeItem('user');
      })
      .addCase(twitterLogin.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(twitterLogin.fulfilled, (state, action) => {
        state.authorizationUrl = action.payload;
      });
  },
});

export const { setToken, clearToken, updateUser, setIsMenuOpen } =
  authSlice.actions;

export default authSlice.reducer;
