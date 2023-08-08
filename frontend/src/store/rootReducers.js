import jobReducer from "./reducers/JobReducer";
import userReducer from "./reducers/userReducer";
import category from "./reducers/categoryReducer";

const rootReducer = {
  cate: category,
  job: jobReducer,
  user: userReducer,
};
export default rootReducer;
