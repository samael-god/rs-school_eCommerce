import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/User';

const initialState: UserSchema = {
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
