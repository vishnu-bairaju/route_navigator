import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import ttapi from "@tomtom-international/web-sdk-services";
import { useState, useEffect, useRef } from "react";
import "./styles.css";

const MapComponent = () => {
  const mapElement = useRef();
  const [longitude, setLongitude] = useState(-0.22);
  const [latitude, setLatitude] = useState(51.2);
  const [map, setMap] = useState({});

  const converToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const drawRoute = (geoJSON, map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    console.log(map);

    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geoJson",
        data: geoJSON,
      },
      paint: {
        "line-color": "#4a90e2",
        "line-width": 6,
      },
    });
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
      lng: longitude,
      lat: latitude,
    };

    let destinations = [];

    let map = tt.map({
      key: "8LwBzLiXVxbsArt800KkbAiK5mT6O3hg",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 8,
    });

    setMap(map);

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({
        offset: popupOffset,
      }).setHTML("This is a stop");
      const element = document.createElement("div");
      element.className = "marker";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });

      marker.setPopup(popup).togglePopup();
    };

    addMarker();

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

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
      reCalculateRoutes();
    });

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <>
      {map && (
        <div className="map-container">
          <div ref={mapElement} className="mapDiv"></div>
          <div className="search-bar">
            <h1>Where to?</h1>
            <input
              type="text"
              id="longitude"
              className="longitude"
              placeholder="Put in longitude"
              onChange={(e) => setLongitude(e.target.value)}
            />
            <input
              type="text"
              id="latitude"
              className="latitude"
              placeholder="Put in latitude"
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MapComponent;
