import { useState, useEffect } from "react";
import Accordion from "../Accordion/AccordionComponent";
import StopComponent from "../StopComponent/StopComponent";
import allActions from "../../actions/indexAction";
import "./styles.css";
import { useDispatch } from "react-redux";

const CreateRouteComponent = ({
  action,
  uniqueId,
  stops,
  setStopDetailList,
  setStops,
  stopDetailList,
  setActualStops,
  setUniqueId,
  routes,
  isEdit,
  EditRoute,
  setIsEdit,
}) => {
  const [isNewStopRequested, setIsNewStopRequested] = useState(false);
  const [routeName, setRouteName] = useState(
    (EditRoute && EditRoute.name) || ""
  );
  const [direction, setDirection] = useState(
    (EditRoute && EditRoute.routeDirection) || "Up"
  );
  const [status, setStatus] = useState(
    (EditRoute && EditRoute.routeStatus) || "active"
  );
  const [stopUniqueId, setStopUniqueId] = useState(new Date().getTime());

  const dispatch = useDispatch();
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

  const handleRouteSubmit = () => {
    console.log({
      id: isEdit ? EditRoute && EditRoute.id : uniqueId,
      name: routeName,
      routeDirection: direction,
      routeStatus: status,
      stops: stopDetailList,
    });
    let routeToBeStored = {
      id: isEdit ? EditRoute && EditRoute.id : uniqueId,
      name: routeName,
      routeDirection: direction,
      routeStatus: status,
      stops: stopDetailList,
    };
    // setRoute(routeToBeStored);
    if (isEdit) {
      dispatch(allActions.routeAction.editRoute(routeToBeStored));
    } else {
      dispatch(allActions.routeAction.createRoute(routeToBeStored));
    }
    setStopDetailList([]);
    setStops(0);
    setActualStops(0);
    setRouteName("");
    setDirection("");
    setStatus("active");
    setUniqueId(new Date().getTime());
    setIsEdit && setIsEdit((prev) => !prev);
  };

  console.log("store routelist", routes);

  useEffect(() => {
    if (EditRoute) setStopDetailList(EditRoute.stops);
  }, [isEdit]);

  console.log("stop details", stopDetailList);

  return (
    <div
      className={`form-wrapper ${action === "create" || isEdit ? "" : "hide"}`}
    >
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
            <input value={isEdit ? EditRoute && EditRoute.id : uniqueId} />
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
        <div className="btn-container">
          <div
            className={`${!isNewStopRequested ? "btn" : "hide"}`}
            onClick={handleAddStopsClick}
          >
            Add Stop
          </div>
          <div onClick={handleRouteSubmit} className="btn">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRouteComponent;
