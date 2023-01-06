import "./styles.css";

// var routes = [
//   {
//     route_name: "klm",
//     route_direction: "up/down",
//     route_id: "1624643654",
//     status: "active",
//     stops: [
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//     ],
//   },
//   {
//     route_name: "klm",
//     route_direction: "up/down",
//     route_id: "1624643654",
//     status: "active",
//     stops: [
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//     ],
//   },
//   {
//     route_name: "klm",
//     route_direction: "up/down",
//     route_id: "1624643654",
//     status: "active",
//     stops: [
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//     ],
//   },
//   {
//     route_name: "klm",
//     route_direction: "up/down",
//     route_id: "1624643654",
//     status: "active",
//     stops: [
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//       {
//         stop_id: "xyz",
//         stop_name: "abc",
//         latitude: "lat1",
//         longitude: "long1",
//       },
//     ],
//   },
// ];

const ViewComponent = ({ routes, clickViewHandler }) => {
  return (
    <div className="view-container">
      {
        <>
          {routes.map((route) => {
            return (
              route && (
                <div
                  className="route-card"
                  onClick={() => clickViewHandler(route)}
                >
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
              )
            );
          })}
        </>
      }
    </div>
  );
};

export default ViewComponent;
