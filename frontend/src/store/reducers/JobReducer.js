import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API/Api";

export const get_jobs = createAsyncThunk(
  "cate/get_jobs",
  async ({ page, keyword, cat, location }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get(
        `/all-jobs?page=${page ? page : "1"}&keyword=${keyword ? keyword : ""}&cat=${
          cat ? cat : ""
        }&location=${location ? location : ""}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const jobReducer = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    uniqLocations: [],
    count: 0,
    pages: 0,
    page: 0,
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
    [get_jobs.fulfilled]: (state, { payload }) => {
      state.jobs = payload.jobs;
      state.uniqLocations = payload.setUniqueLocation;
      state.pages = payload.pages;
      state.page = payload.page;
      state.count = payload.count;
    },
  },
});

export const { messageClear } = jobReducer.actions;

export default jobReducer.reducer;
