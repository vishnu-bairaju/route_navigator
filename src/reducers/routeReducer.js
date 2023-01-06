import { CREATE_ROUTE, DELETE_ROUTE } from "../actions/routeTypes";
import initialState from "./initialState";

export default function routeReducer(state = initialState, action) {
  const updateRoutes = (routesList, targetRoute) => {
    let updatedRoutesList = [];
    routesList.forEach((route) => {
      if (!(route.id === targetRoute.id)) {
        updatedRoutesList.push(route);
      }
    });
    return updatedRoutesList;
  };
  let isRoutePresent = false;
  state.routes.forEach((routeData) => {
    if (routeData.id === action.payload.id) isRoutePresent = true;
  });
  switch (action.type) {
    case CREATE_ROUTE: {
      console.log(state.routes);
      let updatedState = state;
      if (!isRoutePresent) {
        updatedState = {
            routes: [...state.routes, action.payload]};
      }
      return updatedState;
    }

    case DELETE_ROUTE: {
      let updatedRouteData = updateRoutes(state.routes, action.payload);
      return {routes: [...updatedRouteData]};
    }
    default:
      return state;
  }
}
