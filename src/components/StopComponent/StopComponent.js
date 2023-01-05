import { useState } from "react";

const StopComponent = ({
  setStops,
  index,
  setStopDetailList,
  stop,
  stopDetailList,
  setActualStops,
}) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [stopName, setStopName] = useState();

  const handleOnSubmit = (e) => {
    let stop = {
      id: "STOP-" + index,
      name: stopName,
      longitude: lat,
      latitude: lng,
    };
    setStopDetailList((prevList) => {
      prevList.push(stop);
      return prevList;
    });
    setActualStops((prev) => prev + 1);
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
    let updatedStopsList = [];
    stopDetailList.forEach((currstop, index) => {
      if (removedStop && !(currstop.id === removedStop.id)) {
        updatedStopsList.push(currstop);
      }
    });
    setStopDetailList(updatedStopsList);
  };

  console.log("rendered-stop - ", stop);

  return (
    <form className="field-form">
      <div className="field">
        <label className="field-label">Stop Id</label>
        <input value={stop ? stop.id : "STOP-" + index} />
      </div>
      <div className="field">
        <label className="field-label">Stop Name</label>
        <input onBlur={handleNameFocusOut} />
      </div>
      <div className="field">
        <label className="field-label">Latitude</label>
        <input onBlur={handleLatFocusOut} />
      </div>
      <div className="field">
        <label className="field-label">Longitude</label>
        <input onBlur={handleLngFocusOut} />
      </div>
      <div className="field">
        <div onClick={() => handleRemoveStopClick(stop)}>remove</div>
      </div>
      <button onClick={handleOnSubmit}>Add</button>
    </form>
  );
};

export default StopComponent;
