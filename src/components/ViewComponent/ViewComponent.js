import { useDispatch } from "react-redux";
import { useState } from "react";
import allActions from "../../actions/indexAction";
import EditComponent from "../EditComponent/EditComponent";
import "./styles.css";

var dummyRoutes = [
  {
    id: 1673024301903,
    name: "r1",
    routeDirection: "Up",
    routeStatus: "active",
    stops: [
      {
        id: "STOP-1673024535216",
        name: "s1",
        longitude: "-0.3",
        latitude: "51.3",
        addedToRoute: true,
      },
      {
        id: "STOP-1673024558588",
        name: "s2",
        longitude: "-0.5",
        latitude: "51.3",
        addedToRoute: true,
      },
    ],
  },
];

const ViewComponent = ({
  routes,
  clickViewHandler,
  action,
  uniqueId,
  stops,
  setStops,
  stopDetailList,
  setStopDetailList,
  setActualStops,
  setUniqueId,
}) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteClick = (route) => {
    dispatch(allActions.routeAction.deleteRoute(route));
  };
  const handleEditClick = (route) => {
    clickViewHandler(route);
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="view-container">
      {
        <>
          {routes.map((route) => {
            return (
              route && (
                <div className="route-card">
                  <div className="route-details">
                    <div className="route-info">
                      <label className="title">Route Id: </label>
                      <div className="value">{route.id}</div>
                    </div>
                    <div className="route-info">
                      <label className="title">Route Name: </label>
                      <div className="value">{route.name}</div>
                    </div>
                    <div className="route-info">
                      <label className="title">Route Direction: </label>
                      <div className="value">{route.routeDirection}</div>
                    </div>
                    <div className="route-info">
                      <label className="title">Route Status: </label>
                      <div className="value">{route.routeStatus}</div>
                    </div>
                    <div className="route-info">
                      <label className="title">No.of Stops: </label>
                      <div className="value">
                        {route.stops && route.stops.length}
                      </div>
                    </div>
                  </div>
                  <div class="modify-container">
                    <div class="btn" onClick={() => clickViewHandler(route)}>
                      View
                    </div>
                    <div class="btn" onClick={() => handleEditClick(route)}>
                      Edit
                    </div>
                    <div class="btn" onClick={() => handleDeleteClick(route)}>
                      Delete
                    </div>
                  </div>
                  {isEdit && (
                    <EditComponent
                      EditRoute={route}
                      action={action}
                      uniqueId={uniqueId}
                      stops={stops}
                      setStops={setStops}
                      stopDetailList={stopDetailList}
                      setStopDetailList={setStopDetailList}
                      setActualStops={setActualStops}
                      setUniqueId={setUniqueId}
                      routes={routes}
                      setIsEdit={setIsEdit}
                    />
                  )}
                </div>
              )
            );
          })}
        </>
      }
    </div>
  );
};

export default ViewComponent;
