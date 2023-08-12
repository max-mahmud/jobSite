import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import API from "../../API/Api";

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

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await API.get("/logout", { withCredentials: true });
    localStorage.removeItem("userToken");
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//single user details
export const user_details = createAsyncThunk(
  "auth/user_details",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get(`/user-details/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//update user details
export const user_update = createAsyncThunk(
  "auth/user_update",
  async ({ id, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.put(`/user-update/${id}`, info);
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

export const userReducer = createSlice({
  name: "user",
  initialState: {
    userInfo: decodeToken(localStorage.getItem("userToken")),
    userDetails: "",
    applyJobs: [],
    userCount: "",
    users: [],
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
    [user_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loading = false;
      state.userInfo = userInfo;
    },
    [user_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loading = false;
    },
    [all_user.fulfilled]: (state, { payload }) => {
      state.userCount = payload.userCount;
      state.users = payload.users;
    },
    [logout.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.loader = false;
      // state.successMessage = payload.message;
      state.userInfo = payload.token;
    },
    [user_details.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [user_details.fulfilled]: (state, { payload }) => {
      state.userDetails = payload.user;
      state.applyJobs = payload.applyJobs;
      state.loading = false;
    },
    [user_details.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [user_update.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
  },
});

export const { messageClear } = userReducer.actions;

export default userReducer.reducer;
