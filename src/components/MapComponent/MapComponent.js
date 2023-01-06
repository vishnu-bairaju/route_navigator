import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt, { LngLat } from "@tomtom-international/web-sdk-maps";
import ttapi from "@tomtom-international/web-sdk-services";
import { useState, useEffect, useRef } from "react";
import CreateRouteComponent from "../CreateRoute/CreateRouteComponent";
import "./styles.css";

const MapComponent = ({
  stops,
  setStopDetailList,
  setStops,
  stopDetailList,
  actualStops,
  setActualStops,
  setRoute,
  route,
}) => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [action, setAction] = useState("");
  const [uniqueId, setUniqueId] = useState(new Date().getTime());

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

  useEffect(() => {
    const origin = {
      lng:
        stopDetailList &&
        stopDetailList.length > 0 &&
        stopDetailList[0].longitude,
      lat:
        stopDetailList &&
        stopDetailList.length > 0 &&
        stopDetailList[0].latitude,
    };

    let destinations = [];

    let map = tt.map({
      key: "8LwBzLiXVxbsArt800KkbAiK5mT6O3hg",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [
        stopDetailList &&
          stopDetailList.length > 0 &&
          stopDetailList[0].longitude,
        stopDetailList &&
          stopDetailList.length > 0 &&
          stopDetailList[0].latitude,
      ],
      zoom: 8,
    });

    setMap(map);

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
      if (stopDetailList && stopDetailList.length === 1) {
        console.log(stopDetailList[0].latitude, stopDetailList[0].longitude);
        addDeliveryMarker(
          new tt.LngLat(
            Number(stopDetailList[0].longitude),
            Number(stopDetailList[0].latitude)
          ),
          map
        );
      } else if (stopDetailList && stopDetailList.length > 0) {
        stopDetailList.forEach((stop) => {
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

    return () => map.remove();
  }, [actualStops]);

  const clickHandler = (actionType) => {
    setAction(actionType);
    if (actionType === "create") {
      setUniqueId(new Date().getTime());
    }
  };

  console.log(stop);
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
              View
            </div>
            <div
              onClick={() => clickHandler("edit")}
              className={` btn ${action === "edit" ? "enabled" : ""}`}
            >
              Edit
            </div>
            <div
              onClick={() => clickHandler("delete")}
              className={` btn ${action === "delete" ? "enabled" : ""}`}
            >
              Delete
            </div>
          </div>
          <CreateRouteComponent
            action={action}
            uniqueId={uniqueId}
            stops={stops}
            setStops={setStops}
            stopDetailList={stopDetailList}
            setStopDetailList={setStopDetailList}
            actualStops={actualStops}
            setActualStops={setActualStops}
            setRoute={setRoute}
            route={route}
            setUniqueId={setUniqueId}
          />
          <div className={action === "view" ? "show" : "hide"}>View Routes</div>
          <div className={action === "edit" ? "show" : "hide"}>Edit Routes</div>
          <div className={action === "delete" ? "show" : "hide"}>
            Delete Routes
          </div>
        </div>
      )}
    </>
  );
};

export default MapComponent;
