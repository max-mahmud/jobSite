import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API/Api";

//get msg
export const get_msg = createAsyncThunk("cate/get_msg", async (_, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await API.get("/all-msgs");
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//add msg
export const add_msg = createAsyncThunk(
  "msg/add_msg",
  async ({ name, email, message, userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await API.post("/create-msg", { name, email, message, userId });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete msg
export const delete_msg = createAsyncThunk(
  "cate/delete_msg",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/delete-msg/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const messageReducer = createSlice({
  name: "msg",
  initialState: {
    msgs: [],
    msg: "",
    loading: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_msg.pending]: (state, _) => {
      state.loading = true;
    },
    [get_msg.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.msgs = payload.mesages;
    },
  },
});
export const { messageClear } = messageReducer.actions;
export default messageReducer.reducer;
