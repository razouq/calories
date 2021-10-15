import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse} from 'axios';
import history from '../../history';
import { addErrors, cleanErrors } from './serverReducer';

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
  async (data: any, {rejectWithValue, dispatch}) => {
    dispatch(cleanErrors())
    try {
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/users/login', data, {withCredentials: true});
      history.push('/');
      return response.data;
    } catch(e: any) {
      let errorMessages;
      if(e.response.data.message) errorMessages = [e.response.data.message];
      else errorMessages = e.response.data.messages;
      dispatch(addErrors(errorMessages));
      return rejectWithValue(null);
    }
  }
);

export const inviteFriend = createAsyncThunk(
  'inviteFriend',
  async (data: any, {rejectWithValue, dispatch}) => {
    try {
      dispatch(cleanErrors());
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/users/invite-friend', data, {withCredentials: true});
      history.push('/');
      console.log(response.data);
      return response.data;
    } catch(e: any) {
      let errorMessages;
      if(e.response.data.message) errorMessages = [e.response.data.message];
      else errorMessages = e.response.data.messages;
      dispatch(addErrors(errorMessages));
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
    });

    builder.addCase(inviteFriend.fulfilled, (state, action) => {
    });

    builder.addCase(inviteFriend.rejected, (state, action) => {
    });

  },
});

export default usersSlice.reducer;