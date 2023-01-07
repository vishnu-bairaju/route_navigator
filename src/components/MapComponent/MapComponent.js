import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import ttapi from "@tomtom-international/web-sdk-services";
import { useState, useEffect, useRef } from "react";
import CreateRouteComponent from "../CreateRoute/CreateRouteComponent";
import ViewComponent from "../ViewComponent/ViewComponent";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { modifyRouteDataToExport } from "../../utils/utils";
import "./styles.css";

const headers = [
  { label: "Route Id", key: "id" },
  { label: "Route Name", key: "name" },
  { label: "Route Direction", key: "routeDirection" },
  { label: "Route Status", key: "routeStatus" },
  { label: "Route Stops", key: "stops" },
];

const MapComponent = ({
  stops,
  setStopDetailList,
  setStops,
  stopDetailList,
  actualStops,
  setActualStops,
  setRoute,
  route,
  targetRoute,
  setTargetRoute,
}) => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [action, setAction] = useState("");
  const [uniqueId, setUniqueId] = useState(new Date().getTime());
  const routes = useSelector((state) => {
    console.log("State: ", state);
    return state.routeReducer.routes;
  });
  const [isDataExportable, setIsDataExportable] = useState(false);

  const converToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement("div");
    element.className = "marker";
    new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };

  const addNewMarkerAndPlotRoute = (stopsList, map) => {
    console.log("stops list recieved ", stopsList);
    const origin = {
      lng: stopsList && stopsList.length > 0 && stopsList[0].longitude,
      lat: stopsList && stopsList.length > 0 && stopsList[0].latitude,
    };

    let destinations = [];

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return converToPoints(destination);
      });

      const callParameters = {
        key: "8LwBzLiXVxbsArt800KkbAiK5mT6O3hg",
        destinations: pointsForDestinations,
        origins: [converToPoints(origin)],
      };

      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            const resultsArray = results.map((result, index) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              };
            });
            resultsArray.sort((a, b) => {
              return a.drivingtime - b.drivingtime;
            });
            const sortedLocations = resultsArray.map((result) => {
              return result.location;
            });
            resolve(sortedLocations);
          });
      });
    };

    const reCalculateRoutes = () => {
      sortDestinations(destinations).then((sortedDestinations) => {
        sortedDestinations.unshift(origin);

        ttapi.services
          .calculateRoute({
            key: "8LwBzLiXVxbsArt800KkbAiK5mT6O3hg",
            locations: sortedDestinations,
          })
          .then((routeData) => {
            const geoJSON = routeData.toGeoJson();
            if (map.getLayer("route")) {
              map.removeLayer("route");
              map.removeSource("route");
            }
            map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geoJSON,
              },
              paint: {
                "line-color": "#4a90e2",
                "line-width": 3,
              },
            });
          });
      });
    };

    const addStop = () => {
      if (stopsList && stopsList.length === 1) {
        console.log(stopsList[0].latitude, stopsList[0].longitude);
        addDeliveryMarker(
          new tt.LngLat(
            Number(stopsList[0].longitude),
            Number(stopsList[0].latitude)
          ),
          map
        );
      } else if (stopsList && stopsList.length > 0) {
        stopsList.forEach((stop) => {
          destinations.push(
            new tt.LngLat(Number(stop.longitude), Number(stop.latitude))
          );
          addDeliveryMarker(
            new tt.LngLat(Number(stop.longitude), Number(stop.latitude)),
            map
          );
        });
        reCalculateRoutes();
      }
    };

    addStop();
  };

  let csvReport = !!(routes && routes.length > 0)
    ? {
        data: modifyRouteDataToExport(routes),
        headers: headers,
        filename: "route_navigator.csv",
      }
    : {
        data: [],
        headers: headers,
        filename: "route_navigator_empty.csv",
      };

  useEffect(() => {
    let centerLng = 0;
    let centerLat = 0;
    if (!!(stopDetailList && stopDetailList.length > 0)) {
      centerLng = stopDetailList[0].longitude;
      centerLat = stopDetailList[0].latitude;
    } else if (targetRoute && targetRoute.stops.length > 0) {
      centerLng = targetRoute.stops[0].longitude;
      centerLat = targetRoute.stops[0].latitude;
    } else {
      centerLng = 77.59;
      centerLat = 12.97;
    }

    let map = tt.map({
      key: "8LwBzLiXVxbsArt800KkbAiK5mT6O3hg",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [centerLng, centerLat],
      zoom: 8,
    });

    setMap(map);

    if (!!(stopDetailList && stopDetailList.length > 0)) {
      addNewMarkerAndPlotRoute(stopDetailList, map);
    } else if (!!(targetRoute && targetRoute.stops)) {
      addNewMarkerAndPlotRoute(targetRoute.stops, map);
    }

    return () => map.remove();
  }, [actualStops, JSON.stringify(targetRoute)]);

  const clickHandler = (actionType) => {
    setAction(actionType);
    if (actionType === "create") {
      setUniqueId(new Date().getTime());
    } else if (actionType === "export") {
      setIsDataExportable((prev) => {
        if (routes && routes.length > 0) return true;
        return false;
      });
    }
  };

  const clickViewHandler = (route) => {
    console.log(route);
    setTargetRoute({ ...route });
  };

  return (
    <>
      {map && (
        <div className="map-container">
          <div ref={mapElement} className="mapDiv"></div>
          <div className="options-bar">
            <div
              onClick={() => clickHandler("create")}
              className={` btn ${action === "create" ? "enabled" : ""}`}
            >
              Create
            </div>
            <div
              onClick={() => clickHandler("view")}
              className={` btn ${action === "view" ? "enabled" : ""}`}
            >
              View all Routes
            </div>

            <CSVLink
              {...csvReport}
              className={`btn ${action === "export" ? "enabled" : ""}`}
              onClick={() => clickHandler("export")}
            >
              <div
              // className={`btn ${action === "export" ? "enabled" : ""}`}
              // onClick={() => clickHandler("export")}
              >
                Export all Routes
              </div>
            </CSVLink>
            {/* {csvReport.length > 0 ? (
              <CSVLink {...csvReport}>
                <div
                  className={`btn ${action === "export" ? "enabled" : ""}`}
                  onClick={() => clickHandler("export")}
                >
                  Export all Routes
                </div>
              </CSVLink>
            ) : (
              <div
                className={`btn ${action === "export" ? "enabled" : ""}`}
                onClick={() => clickHandler("export")}
              >
                Export all Routes
              </div>
            )} */}
          </div>
          <div className={action === "create" ? "show" : "hide"}>
            <CreateRouteComponent
              action={action}
              uniqueId={uniqueId}
              stops={stops}
              setStops={setStops}
              stopDetailList={stopDetailList}
              setStopDetailList={setStopDetailList}
              setActualStops={setActualStops}
              setUniqueId={setUniqueId}
              routes={routes}
            />
          </div>
          {!!(routes && routes.length > 0) ? (
            <div className={action === "view" ? "show" : "hide"}>
              <ViewComponent
                routes={routes}
                clickViewHandler={clickViewHandler}
                action={action}
                uniqueId={uniqueId}
                stops={stops}
                setStops={setStops}
                stopDetailList={stopDetailList}
                setStopDetailList={setStopDetailList}
                setActualStops={setActualStops}
                setUniqueId={setUniqueId}
                routes={routes}
              />
            </div>
          ) : (
            action === "view" && <div>No Routes found!! 😕</div>
          )}
          {!isDataExportable ? (
            <div className={action === "export" ? "show" : "hide"}>
              No data found to export!! 😕
            </div>
          ) : (
            action === "export" && <div>Data can be exported!! 😊</div>
          )}
        </div>
      )}
    </>
  );
};

export default MapComponent;
