import { CREATE_ROUTE, EDIT_ROUTE, DELETE_ROUTE } from "./routeTypes";

const createRoute = (route) => {
  console.log("Create Route", route);
  return {
    type: CREATE_ROUTE,
    payload: route,
  };
};

const editRoute = (route) => {
    console.log("Edit Route", route);
  return {
    type: EDIT_ROUTE,
    payload: route,
  };
}

const deleteRoute = (route) => {
  return {
    type: DELETE_ROUTE,
    payload: route,
  };
};

export default { createRoute, editRoute, deleteRoute };
