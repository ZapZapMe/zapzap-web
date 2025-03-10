import { createSlice } from '@reduxjs/toolkit';

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    faqs: [],
    status: 'idle',
    error: null,
    openIndices: [],
  },
  reducers: {
    // Define any synchronous actions here if needed
    toggleAccordion: (state, action) => {
      const index = action.payload;
      if (state.openIndices.includes(index)) {
        state.openIndices = state.openIndices.filter((i) => i !== index);
      } else {
        state.openIndices.push(index);
      }
    },
  },
});

export const { toggleAccordion } = faqSlice.actions;
export default faqSlice.reducer;
