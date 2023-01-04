import React from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../actions/indexAction";

const Cart = () => {
  const state = useSelector((state) => state.cartCounter);
  const dispatch = useDispatch();
  // console.log(allActions.itemActions);
  return (
    <div className="cart">
      <h2>Number of items in Cart: {state.numOfItems}</h2>
      <button
        onClick={() => {
          dispatch(allActions.itemActions.addItem());
        }}
      >
        Add Item to Cart
      </button>
      <button
        disabled={state.numOfItems > 0 ? false : true}
        onClick={() => {
          dispatch(allActions.itemActions.deleteItem());
        }}
      >
        Remove Item to Cart
      </button>
    </div>
  );
};

export default Cart;
