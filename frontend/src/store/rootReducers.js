import jobReducer from "./reducers/JobReducer";
import userReducer from "./reducers/userReducer";
import category from "./reducers/categoryReducer";
import messageReducer from "./reducers/messageReducer";

const rootReducer = {
  cate: category,
  job: jobReducer,
  user: userReducer,
  msg: messageReducer,
};
export default rootReducer;
