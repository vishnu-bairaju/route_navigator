export function modifyRouteDataToExport(routeData) {
  let updatedData = [];
  if (routeData && routeData.length > 0) {
    routeData.forEach((route) => {
      updatedData.push({ ...route, stops: JSON.stringify(route.stops) });
    });
  }
  return updatedData;
}
