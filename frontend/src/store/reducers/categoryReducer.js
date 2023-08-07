import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API/Api";

export const get_category = createAsyncThunk(
  "cate/get_category",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get("/all-category");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const category = createSlice({
  name: "cate",
  initialState: {
    categorys: [],
    price: 0,
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
    [get_category.fulfilled]: (state, { payload }) => {
      state.categorys = payload.category;
    },
  },
});

export const { messageClear } = category.actions;

export default category.reducer;
