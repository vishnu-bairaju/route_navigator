import { useState, useEffect } from "react";
import Accordion from "../Accordion/AccordionComponent";
import StopComponent from "../StopComponent/StopComponent";
import "./styles.css";

const CreateRouteComponent = ({
  action,
  uniqueId,
  stops,
  setStopDetailList,
  setStops,
  stopDetailList,
  actualStops,
  setActualStops,
}) => {
  const [isNewStopRequested, setIsNewStopRequested] = useState(false);
  const [stopUniqueId, setStopUniqueId] = useState(new Date().getTime());
  const handleAddStopsClick = () => {
    setStops((prev) => prev + 1);
    setIsNewStopRequested((prev) => !prev);
    setStopUniqueId(new Date().getTime());
  };

  //   useEffect(() => {
  //     console.log(stopDetailList);
  //   }, [actualStops]);

  console.log("stop details", stopDetailList);

  return (
    <div className={`form-wrapper ${action === "create" ? "" : "hide"}`}>
      <form className="field-form ">
        <fieldset>
          <div className="field">
            <label className="field-label">Name</label>
            <input />
          </div>
          <div className="field">
            <label className="field-label">Direction</label>
            <input />
          </div>
          <div className="field">
            <label className="field-label">Route Id</label>
            <input value={uniqueId} />
          </div>
          <div className="field">
            <label className="field-label">Status</label>
            <select id="status" className="status">
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
        <div className={`${isNewStopRequested ? "" : "hide"}`}>
          <fieldset>
            <Accordion>
              <StopComponent
                setStops={setStops}
                index={stopUniqueId}
                setStopDetailList={setStopDetailList}
                stopDetailList={stopDetailList}
                setActualStops={setActualStops}
                setIsNewStopRequested={setIsNewStopRequested}
                isNewStopRequested={isNewStopRequested}
              />
            </Accordion>
          </fieldset>
        </div>
        {/* <StopComponent /> */}
        <div className={`${!isNewStopRequested ? "" : "hide"}`}>
          <div onClick={handleAddStopsClick} stops={stops}>
            Add Stop
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateRouteComponent;
