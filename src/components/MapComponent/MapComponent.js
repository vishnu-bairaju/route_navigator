import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useState, useEffect, useRef } from "react";
import "./styles.css";

const MapComponent = () => {
  const mapElement = useRef();
  const [longitude, setLongitude] = useState(-0.22);
  const [latitude, setLatitude] = useState(51.2);
  const [map, setMap] = useState({});

  useEffect(() => {
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
    
    const addMarker = () => {
      
      const element = document.createElement('div');
      element.className = 'marker';
      const marker = new tt.Marker({
        draggable: true,
        element: element
      })
    }

    setMap(map);
    return () => map.remove();
  }, [longitude, latitude]);

  return (
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
  );
};

export default MapComponent;
