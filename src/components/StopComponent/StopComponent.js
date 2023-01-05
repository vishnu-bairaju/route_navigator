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
}) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [stopName, setStopName] = useState();
  const [isStopAdded, setIsStopAdded] = useState(false);

  const handleOnSubmit = (e) => {
    let stop = {
      id: "STOP-" + index,
      name: stopName,
      longitude: lat,
      latitude: lng,
      addedToRoute: true,
    };
    setStopDetailList((prevList) => {
      prevList.push(stop);
      return prevList;
    });
    // setActualStops((prev) => prev + 1);
    setIsNewStopRequested((prev) => !prev);
    // setIsStopAdded((prev) => !prev);
    e.preventDefault();
  };

  const handleNameFocusOut = (e) => {
    if (isNewStopRequested) {
      setStopName("");
    } else {
      setStopName(e.target.value);
    }
  };

  const handleLatFocusOut = (e) => {
    if (isNewStopRequested) {
      setLat(0);
    } else {
      setLat(e.target.value);
    }
  };

  const handleLngFocusOut = (e) => {
    if (isNewStopRequested) {
      setLng(0);
    } else {
      setLng(e.target.value);
    }
  };

  const handleRemoveStopClick = (removedStop) => {
    setStops((prev) => prev - 1);
    let updatedStopsList = [];
    stopDetailList.forEach((currstop, index) => {
      if (removedStop && !(currstop.id === removedStop.id)) {
        updatedStopsList.push(currstop);
      }
    });
    setStopDetailList(updatedStopsList);
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
        <input onChange={handleNameFocusOut} value={stop && stop.name} />
      </div>
      <div className="field">
        <label className="field-label">Latitude</label>
        <input onChange={handleLatFocusOut} value={stop && stop.latitude} />
      </div>
      <div className="field">
        <label className="field-label">Longitude</label>
        <input onChange={handleLngFocusOut} value={stop && stop.longitude} />
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
