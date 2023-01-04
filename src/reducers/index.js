import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

const allReducers = combineReducers({
  cartCounter: cartReducer
});

export default allReducers;
