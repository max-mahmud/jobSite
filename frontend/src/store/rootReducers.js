import jobReducer  from "./reducers/JobReducer";
import category from "./reducers/categoryReducer";

const rootReducer = {
  cate: category,
  job: jobReducer,
};
export default rootReducer;
