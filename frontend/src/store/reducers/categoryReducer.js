import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API/Api";

//get category
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

//add category
export const add_category = createAsyncThunk(
  "cate/add_category",
  async ({ name }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await API.post("/create-category", { name });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete category
export const delete_category = createAsyncThunk(
  "cate/delete_category",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/category/delete/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//update category
export const update_category = createAsyncThunk(
  "cate/update_category",
  async ({ id, category }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await API.put(`/category/update/${id}`, { category });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//single category
export const single_category = createAsyncThunk(
  "cate/single_category",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await API.get(`/category/${id}`);
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
    category: "",
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
    [single_category.fulfilled]: (state, { payload }) => {
      state.category = payload.singleCate;
    },
  },
});

export const { messageClear } = category.actions;

export default category.reducer;
