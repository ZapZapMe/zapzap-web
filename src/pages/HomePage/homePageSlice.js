import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comment: '',
  step: 1,
  tweetData: null,
  isTweetLoaded: false,
  isLoading: false,
  invoiceData: null,

  // Step 1:
  tweetURL: '',
  isInvalid: false,

  // Step 2:
  isNextDisabled: true,
  isChecked: false,

  // Step 3:
  satValue: '',

  // Step 4:
  copied: false,
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
  },
});

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
} = homePageSlice.actions;

export default homePageSlice.reducer;
