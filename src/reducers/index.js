import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import routeReducer from "./routeReducer";

const allReducers = combineReducers({
  cartCounter: cartReducer,
  routeReducer: routeReducer,
});

export default allReducers;
