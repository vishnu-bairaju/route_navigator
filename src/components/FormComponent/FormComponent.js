import { useState, useReducer } from "react";

const FormComponent = ({
  stopDetailList,
  setStops,
  setStopDetailList,
  setActualStops,
  handleRouteSubmit
}) => {
  const [isNewStopRequested, setIsNewStopRequested] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [direction, setDirection] = useState("Up");
  const [status, setStatus] = useState("active");
  const [stopUniqueId, setStopUniqueId] = useState(new Date().getTime());
  
  const handleAddStopsClick = () => {
    setStops((prev) => prev + 1);
    setIsNewStopRequested((prev) => !prev);
    setStopUniqueId(new Date().getTime());
  };
  const handleNameChange = (e) => {
    setRouteName(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div className="field-form">
      <fieldset>
        <div className="field">
          <label className="field-label">Name</label>
          <input onChange={handleNameChange} value={routeName} />
        </div>
        <div className="field">
          <label className="field-label">Direction</label>
          <select
            id="direction"
            className="direction"
            onChange={handleDirectionChange}
            value={direction}
          >
            <option value="Up">Up</option>
            <option value="Down">Down</option>
          </select>
        </div>
        <div className="field">
          <label className="field-label">Route Id</label>
          <input value={uniqueId} />
        </div>
        <div className="field">
          <label className="field-label">Status</label>
          <select
            id="status"
            className="status"
            onChange={handleStatusChange}
            value={status}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </fieldset>
      {!!(stopDetailList && stopDetailList.length > 0) && (
        <fieldset>
          {stopDetailList.map((currStop, index) => {
            return (
              <Accordion>
                <StopComponent
                  setStops={setStops}
                  index={currStop.id}
                  setStopDetailList={setStopDetailList}
                  stopDetailList={stopDetailList}
                  stop={currStop}
                  setActualStops={setActualStops}
                />
              </Accordion>
            );
          })}
        </fieldset>
      )}
      {isNewStopRequested && (
        <fieldset className={`${isNewStopRequested ? "" : "hide"}`}>
          <Accordion>
            <StopComponent
              setStops={setStops}
              index={stopUniqueId}
              setStopDetailList={setStopDetailList}
              stopDetailList={stopDetailList}
              setActualStops={setActualStops}
              setIsNewStopRequested={setIsNewStopRequested}
              isNewStopRequested={isNewStopRequested}
              isNewStop
            />
          </Accordion>
        </fieldset>
      )}
      {/* <StopComponent /> */}
      <div className={`${!isNewStopRequested ? "" : "hide"}`}>
        <div onClick={handleAddStopsClick} stops={stops}>
          Add Stop
        </div>
      </div>
      <div onClick={handleRouteSubmit}>Submit</div>
      {/* <button type="submit">Submit</button> */}
    </div>
  );
};

export default FormComponent;
