import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

export const userSignup = createAsyncThunk(
  "signup/userSignup",
  async ({ email, password, username }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await axiosInstance.post(`/api/auth/local/register`, {
        email,
        password,
        username,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const selectSignup = (state) => state.signup;
export default signupSlice.reducer;
