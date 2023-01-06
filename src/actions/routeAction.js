import { CREATE_ROUTE, DELETE_ROUTE } from "./routeTypes";

const createRoute = (route) => {
  console.log("Create Route", route);
  return {
    type: CREATE_ROUTE,
    payload: route,
  };
};

const deleteRoute = () => {
  return {
    type: DELETE_ROUTE,
    payload: route,
  };
};

export default { createRoute, deleteRoute };
