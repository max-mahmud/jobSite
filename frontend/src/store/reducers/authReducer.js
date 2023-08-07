import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import API from "./../../API/Api";

export const user_register = createAsyncThunk(
  "user/user_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post("/register", info);
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const user_login = createAsyncThunk(
  "user/user_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post("/login", info);
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const all_user = createAsyncThunk(
  "auth/all_user",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get("/all-user");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  try {
    const user = jwt(token);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const authReducer = createSlice({
  name: "user",
  initialState: {
    userInfo: decodeToken(localStorage.getItem("userToken")),
    userCount: "",
    successMessage: "",
    errorMessage: "",
    loading: false,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [user_register.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [user_register.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loading = false;
      state.userInfo = userInfo;
    },
    [user_register.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loading = false;
    },
    [user_login.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [user_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loading = false;
    },
    [user_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loading = false;
      state.userInfo = userInfo;
    },
    [all_user.fulfilled]: (state, { payload }) => {
      state.userCount = payload.userCount;
    },
  },
});

export const { messageClear } = authReducer.actions;

export default authReducer.reducer;
