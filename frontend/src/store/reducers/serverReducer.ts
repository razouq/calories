import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define a type for the slice state
interface FoodsState {
  errors: string[];
}

// Define the initial state using that type
const initialState: FoodsState = {
  errors: [],
}

const serverSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    cleanErrors: (state) => {
      state.errors = [];
    },
    addErrors: (state, action) => {
      console.log('action', action)
      state.errors = action.payload;
    }
  },
});

export const { addErrors, cleanErrors } = serverSlice.actions;

export default serverSlice.reducer;