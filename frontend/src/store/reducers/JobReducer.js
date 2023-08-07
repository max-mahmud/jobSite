import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API/Api";

export const get_jobs = createAsyncThunk(
  "job/get_jobs",
  async ({ page, keyword, cat, location, sort }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get(
        `/all-jobs?page=${page ? page : "1"}&keyword=${keyword ? keyword : ""}&cat=${
          cat ? cat : ""
        }&location=${location ? location : ""}&sort=${sort}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_jobs = createAsyncThunk(
  "job/add_jobs",
  async ({ title, description, salary, location, category }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post("/create-job", { title, description, salary, location, category });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const single_job = createAsyncThunk(
  "job/single_job",
  async ({ id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get(`/single-job/${id}`, { id });
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
    [get_jobs.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [get_jobs.fulfilled]: (state, { payload }) => {
      state.jobs = payload.jobs;
      state.uniqLocations = payload.setUniqueLocation;
      state.pages = payload.pages;
      state.page = payload.page;
      state.count = payload.count;
      state.loading = false;
    },
    [get_jobs.rejected]: (state, _) => {
      state.loading = false;
    },
    [add_jobs.pending]: (state, _) => {
      state.loading = true;
    },
    [add_jobs.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.loading = false;
    },
    [add_jobs.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loading = false;
    },
  },
});

export const { messageClear } = jobReducer.actions;

export default jobReducer.reducer;
