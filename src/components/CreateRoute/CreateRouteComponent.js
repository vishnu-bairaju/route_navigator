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
  const handleAddStopsClick = () => {
    setStops((prev) => prev + 1);
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
        {!!(stops && stops > 0) && (
          <fieldset>
            {[...Array(stops)].map((_, index) => {
              return (
                <Accordion>
                  <StopComponent
                    setStops={setStops}
                    index={index}
                    setStopDetailList={setStopDetailList}
                    stopDetailList={stopDetailList}
                    // stop={stopDetailList[index]}
                    setActualStops={setActualStops}
                  />
                </Accordion>
              );
            })}
          </fieldset>
        )}
        {/* <StopComponent /> */}
        <div className="field">
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
