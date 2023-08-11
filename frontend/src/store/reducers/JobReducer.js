import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../API/Api";

//add job
export const add_jobs = createAsyncThunk(
  "job/add_jobs",
  async (addjob, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post("/create-job", addjob, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get job
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

//get all job count
export const all_job_count = createAsyncThunk(
  "job/all_job_count",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get("/all-job-count");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get single job
export const single_job = createAsyncThunk(
  "job/single_job",
  async ({ id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get(`/single-job/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//update job
export const update_job = createAsyncThunk(
  "job/update_job",
  async (
    { title, description, salary, location, company, requirements, benefits, category, id },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await API.put(`/update-job/${id}`, {
        title,
        description,
        salary,
        location,
        company,
        requirements,
        benefits,
        category,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//update logo
export const update_logo = createAsyncThunk(
  "job/update_job",
  async ({ newImage, jobid }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      // formData.append('oldImage', oldImage)
      formData.append("newImage", newImage);
      formData.append("jobid", jobid);
      const { data } = await API.put("/update-logo", formData);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete the job
export const delet_job = createAsyncThunk(
  "job/delet_job",
  async ({ id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.delete(`/delete-job/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//table -job
export const table_jobs = createAsyncThunk(
  "job/table_jobs",
  async ({ page, keyword }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get(
        `/table-jobs?page=${page ? page : "1"}&keyword=${keyword ? keyword : ""}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//job applying
export const apply_job = createAsyncThunk(
  "job/apply_job",
  async (applyjob, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post("/apply-job", applyjob, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get all job applying
export const get_all_apply_job = createAsyncThunk(
  "job/get_all_apply_job",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.get("/all-apply-job");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete job applying
export const delete_apply_job = createAsyncThunk(
  "job/delete_apply_job",
  async (applyId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.delete(`/delete-apply-job/${applyId}`);
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
    job: "",
    uniqLocations: [],
    allApplyjob: [],
    allApplyCount: 0,
    tableJobs: [],
    count: 0,
    allCount: 0,
    pages: 0,
    page: 0,
    loading: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = null;
      state.errorMessage = null;
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
      state.successMessage = "";
      state.errorMessage = "";
    },
    [add_jobs.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.loading = false;
    },
    [add_jobs.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loading = false;
    },
    [update_job.pending]: (state, { payload }) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
    [update_job.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.errorMessage = "";
    },
    [update_job.rejected]: (state, { payload }) => {
      state.successMessage = "";
      state.errorMessage = payload.error;
    },
    [single_job.pending]: (state, _) => {
      state.loading = true;
    },
    [single_job.fulfilled]: (state, { payload }) => {
      state.job = payload.job;
      state.loading = false;
    },
    [single_job.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [table_jobs.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [table_jobs.fulfilled]: (state, { payload }) => {
      state.tableJobs = payload.jobs;
      state.pages = payload.pages;
      state.page = payload.page;
      state.count = payload.count;
      state.loading = false;
    },
    [table_jobs.rejected]: (state, _) => {
      state.loading = false;
    },
    [delet_job.pending]: (state, { payload }) => {
      state.successMessage = "";
      state.errorMessage = "";
      state.loading = true;
    },
    [delet_job.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.loading = false;
    },
    [delet_job.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loading = false;
    },
    [get_all_apply_job.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [get_all_apply_job.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allApplyCount = payload.applyCount;
      state.allApplyjob = payload.allApplyJob;
    },
    [all_job_count.fulfilled]: (state, { payload }) => {
      state.allCount = payload.allCount;
    },
  },
});

export const { messageClear } = jobReducer.actions;

export default jobReducer.reducer;
