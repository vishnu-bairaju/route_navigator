import { useState, useEffect } from "react";
import "./styles.css";

const StopComponent = ({
  setStops,
  index,
  setStopDetailList,
  stop,
  stopDetailList,
  setActualStops,
  setIsNewStopRequested,
  isNewStopRequested,
  isNewStop,
}) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [stopName, setStopName] = useState("");
  const [isStopAdded, setIsStopAdded] = useState(false);

  const handleOnSubmit = (e) => {
    let stop = {
      id: "STOP-" + index,
      name: stopName,
      longitude: lng,
      latitude: lat,
      addedToRoute: true,
    };
    setStopDetailList((prevList) => {
      prevList.push(stop);
      return prevList;
    });
    setActualStops((prev) => prev + 1);
    setIsNewStopRequested((prev) => !prev);
    // setIsStopAdded((prev) => !prev);
    e.preventDefault();
  };

  const handleNameFocusOut = (e) => {
    setStopName(e.target.value);
  };

  const handleLatFocusOut = (e) => {
    setLat(e.target.value);
  };

  const handleLngFocusOut = (e) => {
    setLng(e.target.value);
  };

  const handleRemoveStopClick = (removedStop) => {
    setStops((prev) => prev - 1);
    if (!isNewStopRequested && removedStop && removedStop.addedToRoute) {
      let updatedStopsList = [];
      stopDetailList.forEach((currstop, index) => {
        if (!(currstop.id === removedStop.id)) {
          updatedStopsList.push(currstop);
        }
      });
      setStopDetailList(updatedStopsList);
      setActualStops((prev) => prev - 1);
    } else {
      setIsNewStopRequested((isNewStopRequested) => !isNewStopRequested);
    }
  };

  // useEffect(() => {
  //   if (isNewStopRequested) {
  //     handleNameFocusOut();
  //     handleLatFocusOut();
  //     handleLngFocusOut();
  //   }
  // }, isNewStopRequested);

  console.log("rendered-stop - ", stop);

  return (
    <form className="field-form">
      <div className="field">
        <label className="field-label">Stop Id</label>
        <input value={stop ? stop.id : "STOP-" + index} />
      </div>
      <div className="field">
        <label className="field-label">Stop Name</label>
        <input
          onChange={handleNameFocusOut}
          value={stop && stop.addedToRoute && stop.name}
        />
      </div>
      <div className="field">
        <label className="field-label">Latitude</label>
        <input
          onChange={handleLatFocusOut}
          value={stop && stop.addedToRoute && stop.latitude}
        />
      </div>
      <div className="field">
        <label className="field-label">Longitude</label>
        <input
          onChange={handleLngFocusOut}
          value={!isNewStop ? stop.longitude : lng}
        />
      </div>
      <div className="field">
        <div onClick={() => handleRemoveStopClick(stop)}>remove</div>
      </div>
      <div
        onClick={handleOnSubmit}
        className={stop && stop.addedToRoute ? "hide" : ""}
      >
        Add
      </div>
    </form>
  );
};

export default StopComponent;
