import { useState } from "react";
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
  setRoute,
  routes,
}) => {
  const [isNewStopRequested, setIsNewStopRequested] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [direction, setDirection] = useState("");
  const [status, setStatus] = useState("active");
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
      id: uniqueId,
      name: routeName,
      routeDirection: direction,
      routeStatus: status,
      stops: stopDetailList,
    });
    let routeToBeStored = {
      id: uniqueId,
      name: routeName,
      routeDirection: direction,
      routeStatus: status,
      stops: stopDetailList,
    };
    // setRoute(routeToBeStored);
    dispatch(allActions.routeAction.createRoute(routeToBeStored));
    setStopDetailList([]);
    setStops(0);
    setActualStops(0);
    setRouteName("");
    setDirection("");
    setStatus("active");
    setUniqueId(new Date().getTime());
  };

  console.log("store routelist", routes);

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
            <input onChange={handleNameChange} value={routeName} />
          </div>
          <div className="field">
            <label className="field-label">Direction</label>
            <input onChange={handleDirectionChange} value={direction} />
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
      </form>
    </div>
  );
};

export default CreateRouteComponent;
