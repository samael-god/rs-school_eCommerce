import { createAsyncThunk } from '@reduxjs/toolkit';

import { SubmitData } from '@/features/Registration';
import { signUpUser } from '@/shared/api';

export const signUpUserThunk = createAsyncThunk(
  'signUp/signUpUserThunk',
  async (signUpData: SubmitData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await signUpUser(signUpData);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return rejectWithValue(message);
      }
      return undefined;
    }
  },
);
