import { configureStore } from '@reduxjs/toolkit';
import foodsReducer from './reducers/foodsReducer';
import serverReducer from './reducers/serverReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    foods: foodsReducer,
    server: serverReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;