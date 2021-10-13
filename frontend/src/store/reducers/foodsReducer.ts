import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import history from '../../history';
import _ from 'lodash';

// Define a type for the slice state
interface FoodsState {
  foods: {
    [_id: string]: any;
  };
}

// Define the initial state using that type
const initialState: FoodsState = {
  foods: {},
}

export const listFoods = createAsyncThunk(
  'listFoods',
  async (data, {rejectWithValue}) => {
    try {
      const response: AxiosResponse = await axios.get('http://localhost:5000/api/foods', {withCredentials: true});
      return response.data
    } catch(e) {
      return rejectWithValue(false);
    }
  }
);


export const loginFood = createAsyncThunk(
  'loginFood',
  async (data: any, {rejectWithValue}) => {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/foods/login', data, {withCredentials: true});
      return response.data;
    } catch(e) {
      return rejectWithValue(null);
    }
  }
);


const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listFoods.fulfilled, (state, action) => {
      state.foods = _.mapKeys(action.payload as [], '_id');
    });

    builder.addCase(listFoods.rejected, (state, action) => {
      state.foods = action.payload as [];
    });

  },
});

// export const { fetchSuccess, fetchError } = foodsSlice.actions;

export default foodsSlice.reducer;