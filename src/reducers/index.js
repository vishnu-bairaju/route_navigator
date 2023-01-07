import { combineReducers } from "redux";
import routeReducer from "./routeReducer";

const allReducers = combineReducers({
  routeReducer: routeReducer,
});

export default allReducers;
