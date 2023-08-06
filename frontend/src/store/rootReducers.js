import jobReducer from "./reducers/JobReducer";
import authReducer from "./reducers/authReducer";
import category from "./reducers/categoryReducer";

const rootReducer = {
  cate: category,
  job: jobReducer,
  user: authReducer,
};
export default rootReducer;
