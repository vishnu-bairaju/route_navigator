import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { useState } from "react";
import store from "./store/store";
import Cart from "./components/cartComponent";
import MapComponent from "./components/MapComponent/MapComponent";
import AccordionComponent from "./components/Accordion/AccordionComponent";
import FormComponent from "./components/FormComponent/FormComponent";
import "./styles.css";

export default function App() {
  const [stops, setStops] = useState(0);
  const [stopDetailList, setStopDetailList] = useState([]);
  const [actualStops, setActualStops] = useState(0);
  const [route, setRoute] = useState({});
  const [targetRoute, setTargetRoute] = useState();
  // const store = createStore(store, devToolsEnhancer());
  return (
    <Provider store={store}>
      <div className="App">
        <div className="header">Route Navigator</div>
        {/* <AccordionComponent /> */}
        {/* <FormComponent /> */}
        <MapComponent
          stops={stops}
          setStops={setStops}
          stopDetailList={stopDetailList}
          setStopDetailList={setStopDetailList}
          actualStops={actualStops}
          setActualStops={setActualStops}
          setRoute={setRoute}
          route={route}
          targetRoute={targetRoute}
          setTargetRoute={setTargetRoute}
        />
      </div>
    </Provider>
  );
}
