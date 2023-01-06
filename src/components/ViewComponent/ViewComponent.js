import { useDispatch } from "react-redux";
import allActions from "../../actions/indexAction";
import "./styles.css";

var dummyRoutes = [
  {
    name: "klm",
    routeDirection: "up/down",
    id: "1624643654",
    routeStatus: "active",
    stops: [
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
    ],
  },
  {
    name: "klm",
    routeDirection: "up/down",
    id: "1624643654",
    routeStatus: "active",
    stops: [
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
    ],
  },
  {
    name: "klm",
    routeDirection: "up/down",
    id: "1624643654",
    routeStatus: "active",
    stops: [
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
    ],
  },
  {
    name: "klm",
    routeDirection: "up/down",
    id: "1624643654",
    routeStatus: "active",
    stops: [
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
      {
        stop_id: "xyz",
        stop_name: "abc",
        latitude: "lat1",
        longitude: "long1",
      },
    ],
  },
];

const ViewComponent = ({ routes, clickViewHandler }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (route) => {
    dispatch(allActions.routeAction.deleteRoute(route));
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
                    <div class="btn">Edit</div>
                    <div class="btn" onClick={() => handleDeleteClick(route)}>
                      Delete
                    </div>
                  </div>
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
