import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import history from '../../history';

// Define a type for the slice state
interface UsersState {
  user: any;
}

// Define the initial state using that type
const initialState: UsersState = {
  user: null,
}

export const fetchCurrentUser = createAsyncThunk(
  'fetchCurrentUser',
  async (data, {rejectWithValue}) => {
    try {
      const response: AxiosResponse = await axios.get('http://localhost:5000/api/users/me', {withCredentials: true});
      return response.data
    } catch(e) {
      return rejectWithValue(false);
    }
  }
);


export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: any, {rejectWithValue}) => {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/users/login', data, {withCredentials: true});
      history.push('/');
      return response.data;
    } catch(e) {
      return rejectWithValue(null);
    }
  }
);


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      console.log('login rejected');
    });

  },
});

// export const { fetchSuccess, fetchError } = usersSlice.actions;

export default usersSlice.reducer;