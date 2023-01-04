import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./components/cartComponent";
import MapComponent from "./components/MapComponent/MapComponent";
import "./styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="header">Route Navigator</div>
        <MapComponent />
      </div>
    </Provider>
  );
}
