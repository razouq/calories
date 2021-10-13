import { configureStore } from '@reduxjs/toolkit';
import foodsReducer from './reducers/foodsReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    foods: foodsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;