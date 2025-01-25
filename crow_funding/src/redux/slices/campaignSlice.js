import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    chooseCampaign: (state, action) => {
      state.name = action.payload; // action.payload should be the name itself
    },
  },
});

// Export the action
export const { chooseCampaign } = campaignSlice.actions;

// Export the reducer
export default campaignSlice.reducer;
