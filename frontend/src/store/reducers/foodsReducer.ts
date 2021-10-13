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



export const deleteFood = createAsyncThunk(
  'deleteFood',
  async (data: string, {rejectWithValue, dispatch}) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/${data}`, {withCredentials: true});
      dispatch(listFoods());
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

    builder.addCase(deleteFood.fulfilled, (state, action) => {
    });

    builder.addCase(deleteFood.rejected, (state, action) => {
    });
  },
});

// export const { fetchSuccess, fetchError } = foodsSlice.actions;

export default foodsSlice.reducer;