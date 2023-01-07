import CreateRouteComponent from "../CreateRoute/CreateRouteComponent";
import "./styles.css";

const EditComponent = ({
  EditRoute,
  action,
  uniqueId,
  stops,
  setStops,
  stopDetailList,
  setStopDetailList,
  setActualStops,
  setUniqueId,
  routes,
  setIsEdit,
}) => {
  const handleCloseClick = () => {
    setIsEdit((prev) => !prev);
    setStopDetailList([]);
  };
  return (
    <>
      {EditRoute && (
        <div className="edit-container">
          <CreateRouteComponent
            action={action}
            uniqueId={uniqueId}
            stops={stops}
            setStops={setStops}
            stopDetailList={stopDetailList}
            setStopDetailList={setStopDetailList}
            setActualStops={setActualStops}
            setUniqueId={setUniqueId}
            routes={routes}
            isEdit
            EditRoute={EditRoute}
            setIsEdit={setIsEdit}
          />
          <div onClick={handleCloseClick} className="btn">
            close
          </div>
        </div>
      )}
    </>
  );
};

export default EditComponent;
