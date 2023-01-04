import { ADD_ITEM, DELETE_ITEM } from "../actions/typesAction";
import initialState from "./initialState";

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      console.log(state.numOfItems + 1);
      return {
        ...state,
        numOfItems: state.numOfItems + 1
      };
    }

    case DELETE_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems - 1
      };
    default:
      return state;
  }
}
